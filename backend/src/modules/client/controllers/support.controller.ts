import {createSupportValidator} from "../../../validator/others.client.validator";
import {ICustomRequest} from "../../../types/client.types";
import createHttpError from "http-errors";
import {NextFunction, Request, Response} from "express";
import {checkIsUserExist} from "../services/auth.service";
import prisma from "../../../config/prisma.config";

const createSupport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body = req.body;
        const _req = req as ICustomRequest;
        if(!_req.user) return next(createHttpError(400, "User not found"));

        const user= await  checkIsUserExist(_req.user.email);

        if(!user) return next(createHttpError(400, "User not found"));
        const validate = createSupportValidator.safeParse(body);
        if(!validate.success) return next(createHttpError(400, validate.error.errors[0].message));

        const support = await prisma.support.create({
            data:{
                queryTitle: body.queryTitle,
                queryDescription: body.queryDescription,
                user:{
                    connect: {
                        id: user.id
                    }
                },
                isSolved: false,
            },
            select: {
                id: true,
                queryTitle: true,
                queryDescription: true,
                createdAt: true,
                isSolved: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    }
                }
            }
        })
        if(!support) return next(createHttpError(500, "Something went wrong!"));

        return res.status(200).json({
            success: true,
            message: "Support created successfully!",
            data:support
        })


    }catch (e) {
        return  next(createHttpError(500, "Something went wrong!"));
    }
}


const getSupport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const _req = req as ICustomRequest;
        if(!_req.user) return next(createHttpError(400, "User not found"));

        const user= await  checkIsUserExist(_req.user.email);

        if(!user) return next(createHttpError(400, "User not found"));

        const support = await prisma.support.findMany({
            where: {
                user: {
                    id: user.id
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    }
                }
            }
        })
        if(!support) return next(createHttpError(500, "Something went wrong!"));
        return res.status(200).json({
            success: true,
            message: "Support fetched successfully!",
            data: support
        })
    }catch (e) {
        return  next(createHttpError(500, "Something went wrong!"));
    }
}





export {
    createSupport,
    getSupport
}