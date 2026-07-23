import { Linkedin, Mail, Download } from 'lucide-react';

export function MobileProfileHeader() {
  return (
    <div className="flex flex-row items-center gap-4 p-4 border-b border-slate-700 md:hidden bg-slate-800">
      {/* Avatar - Left Side */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xl">DV</span>
      </div>

      {/* Right Side - Info Stack */}
      <div className="flex flex-col gap-1 flex-1">
        {/* Name */}
        <h1 className="text-white text-base leading-tight">Dmytro Vychkin</h1>

        {/* Title */}
        <p className="text-slate-400 text-xs leading-tight mb-1">.NET & AI Developer</p>

        {/* Social Icons - Compact Row */}
        <div className="flex gap-2">
          <a
            href="https://www.linkedin.com/in/vychkin-dotnet-developer/"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 text-slate-300" />
          </a>
          <a
            href="mailto:vychkin.dmytro@gmail.com"
            className="w-7 h-7 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-300" />
          </a>
          <a
            href='https://cvapplicationstorage.blob.core.windows.net/cvcontext/CV_Dmytro_Vychkin_net_Developer.pdf'
            target="_blank"
            className="h-7 px-2 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-300 text-xs">CV</span>
          </a>
        </div>
      </div>
    </div>
  );
}
