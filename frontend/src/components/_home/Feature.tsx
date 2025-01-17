import { _features } from "../../constants/home.constants";
import FeatureCard from "./FeatureCard";

const Feature = () => {
  return (
    <div className="w-full ">
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-neutral-50 to-neutral-100"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          id="el-b68tvb3a"
        >
          <div
            className="text-center mb-20 animate__animated animate__fadeIn"
            id="el-pzx64njc"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight"
              id="el-teguf824"
            >
              Powerful Features for Modern Learning
            </h2>
            <p
              className="text-neutral-600 text-xl max-w-2xl mx-auto leading-relaxed"
              id="el-ivxno0uf"
            >
              Our AI-powered quiz platform combines cutting-edge technology with
              intuitive design
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="el-m031kk9x"
          >
            {_features.map((feature) => (
              <FeatureCard {...feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
