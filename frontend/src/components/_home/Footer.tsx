import { _footerData } from "../../constants/home.constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {_footerData.companyInfo.name}
            </h3>
            <p className="mb-4">{_footerData.companyInfo.description}</p>
            <div className="flex space-x-4">
              {_footerData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={link.icon}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {_footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.link}
                    className="hover:text-white transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="relative">
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {_footerData.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    className="hover:text-white   transition-colors"
                  >
                    {resource.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-md">
              <p>Links to the resources will be added soon</p>
            </div>
          </div>

          {/* Newsletter */}
          {/* TO DO */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">{_footerData.footerText}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {_footerData.bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
