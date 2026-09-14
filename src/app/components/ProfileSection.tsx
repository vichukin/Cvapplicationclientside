import { Linkedin, Mail, Download } from "lucide-react";

export function ProfileSection() {
  return (
    <div className="flex flex-col items-center gap-4 p-8 border-b border-slate-700">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <span className="text-white text-3xl">DV</span>
      </div>

      {/* Name and Title */}
      <div className="text-center">
        <h1 className="text-white text-xl mb-1">
          Dmytro Vychkin
        </h1>
        <p className="text-slate-400 text-sm">
          .NET & AI Developer
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4">
        <a
          href="https://www.linkedin.com/in/vychkin-dotnet-developer/"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
        >
          <Linkedin className="w-5 h-5 text-slate-300" />
        </a>
        <a
          href="mailto:vychkin.dmytro@gmail.com"
          className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
        >
          <Mail className="w-5 h-5 text-slate-300" />
        </a>
        <a
          href="https://cvapplicationstorage.blob.core.windows.net/cvcontext/CV_Dmytro_Vychkin_net_Developer.pdf"
          target="_blank"
          className="h-10 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-5 h-5 text-slate-300" />
          <span className="text-slate-300 text-sm">CV</span>
        </a>
      </div>
    </div>
  );
}