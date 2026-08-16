import logo from '../assets/logo 2.png';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import Icons from './Icons';
export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA] pt-[60px] px-6 sm:px-10 lg:px-[130px]">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div className="mb-3 max-w-sm">
          <div className="flex items-center mb-3">
            <div className="text-white font-bold text-xl">
              <img className="w-[70px]" src={logo} />
            </div>

            <div className="flex flex-col gap-0">
              <h1 className="m-0 font-bold text-[25px] text-[#F09C00] leading-none">
                inzozI
              </h1>
              <span className="m-0 text-[11px] text-[#FFB833] leading-none">
                Smart Dreams. Bright Futures
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[13px] text-[#000000] leading-relaxed">
              Connecting schools and families across Rwanda through
              innovative technology. Making quality education accessible for
              every child.
            </h4>
          </div>

          <div className="flex gap-3 pt-4">
            <Icons icons={<FaTwitter />} />
            <Icons icons={<FaLinkedinIn />} />
            <Icons icons={<FaGithub />} />
            <Icons icons={<MdOutlineMailOutline />} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 lg:flex-shrink-0">
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">Legal</h1>
            <p className="text-black text-[14px] py-1 ">Privacy Policy</p>
            <p className="text-black text-[14px] py-1 ">Terms of Service</p>
            <p className="text-black text-[14px] py-1 ">Cookie Policy</p>
            <p className="text-black text-[14px] py-1 ">GDPR</p>
          </div>
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">Products</h1>
            <p className="text-black text-[14px] py-1 ">Features</p>
            <p className="text-black text-[14px] py-1 ">How It Works</p>
            <p className="text-black text-[14px] py-1 ">Pricing</p>
            <p className="text-black text-[14px] py-1 ">Demo</p>
          </div>
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">Resources</h1>
            <p className="text-black text-[14px] py-1 ">Documentation</p>
            <p className="text-black text-[14px] py-1 ">Guide</p>
            <p className="text-black text-[14px] py-1 ">Api</p>
            <p className="text-black text-[14px] py-1 ">Support</p>
          </div>
          <div>
            <h1 className="text-[#F09C00] text-[15px] py-2 ">Company</h1>
            <p className="text-black text-[14px] py-1 ">About Us</p>
            <p className="text-black text-[14px] py-1 ">Carrers</p>
            <p className="text-black text-[14px] py-1 ">Press</p>
            <p className="text-black text-[14px] py-1 ">Contact</p>
          </div>
        </div>
      </div>
      <div className="border-t border-black border-b">
        <h1 className="text-center text-[#F09C00] pt-[30px] py-6">Stay Updated</h1>
        <p className="text-center px-4 text-[13.5px] sm:text-base">
          Get the latest news and updates about Inzozi&apos;s features and
          Rwanda&apos;s education sector.
        </p>

        <form className="flex flex-col sm:flex-row justify-center gap-2 py-7 px-6" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full sm:w-[319px] py-2 h-[40px] px-2 focus:outline-none rounded-md bg-white text-primary-color" placeholder="Enter your Email"/>
            <button className="bg-[#054069] text-white flex justify-center items-center rounded-md cursor-pointer px-4 py-2">Subscribe</button>
        </form>
      </div>

      <div className="pt-[20px] flex flex-col sm:flex-row gap-2 justify-between text-center sm:text-left pb-8 text-[13px]">
           <h1>© 2025 Inzozi. All rights reserved.</h1>
           <div className="flex gap-[10px] justify-center sm:justify-start">
            <h1>Kigali, Rwanda</h1>
           </div>
      </div>
    </div>
  );
}
