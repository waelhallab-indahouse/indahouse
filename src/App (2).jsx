import { useState, useEffect, useRef } from "react";

// ─── BRAND ────────────────────────────────────────────────────────────────────
// ─── BRAND ────────────────────────────────────────────────────────────────────
const C = {
  primary:"#FF6B1A",     primaryDim:"#FF6B1A14",  primaryBorder:"#FF6B1A40",
  accent:"#4DAAFF",      accentDim:"#4DAAFF12",
  bg:"#070D1C",          card:"#0C1528",           cardHigh:"#101D35",
  border:"#182740",      muted:"#1C2C44",
  green:"#00D98A",       greenDim:"#00D98A12",
  red:"#FF3B5C",         redDim:"#FF3B5C14",
  text:"#EDF2FB",        sub:"#4A6285",            sub2:"#1C2C44",
  get yellow(){ return this.primary; },
  get yellowDim(){ return this.primaryDim; },
  get yellowBorder(){ return this.primaryBorder; },
  get blue(){ return this.accent; },
};
const GENRES = ["House","Techno","Hip-Hop","R&B","Latin","Afrobeats","Jazz","Pop","EDM","Reggaeton","Disco","Funk"];
const EVENT_TYPES = ["House Party","Dinner Party","Birthday","Wedding","Rooftop","Anniversary","Corporate","Bar Mitzvah"];
const DURATIONS = ["1 hour","1.5 hours","2 hours","3 hours","4 hours","5 hours","6+ hours (custom)"];
const genId = () => Math.random().toString(36).slice(2,9);

// ─── SEED DJS ─────────────────────────────────────────────────────────────────
const SEED_DJS = [
  {id:1,name:"DJ Solaris",avatar:"☀️",city:"Miami",genres:["House","Techno","EDM"],fee:120,feeUnit:"hr",rating:4.9,reviewCount:87,bio:"10 years on the decks. Resident at Club Space Miami. I'll turn your living room into a deep house journey — all from my studio.",events:["House Party","Rooftop","Corporate"],available:["2025-06-14","2025-06-21","2025-06-28","2025-07-05"],minHours:1,reviews:[{id:"rv1",author:"Marcus T.",avatar:"M",rating:5,date:"2025-05-10",eventType:"House Party",duration:"3 hours",text:"Booked Solaris for my birthday. Streamed flawlessly through my Sonos. Guests had no idea the DJ wasn't in the room — until I told them. Incredible.",helpful:18},{id:"rv2",author:"Sofia R.",avatar:"S",rating:5,date:"2025-04-22",eventType:"Rooftop",text:"Remote set for our rooftop. He took song requests through the app, read the vibe perfectly. Zero technical issues.",helpful:11}],ratingBreakdown:{5:79,4:6,3:2,2:0,1:0}},
  {id:2,name:"La Reina",avatar:"👑",city:"Los Angeles",genres:["Latin","Reggaeton","Afrobeats"],fee:95,feeUnit:"hr",rating:4.8,reviewCount:64,bio:"Bringing sabor to your speakers. I specialize in remote dinner sets and celebration vibes — Latin heat piped straight to your party.",events:["Dinner Party","Birthday","Wedding"],available:["2025-06-15","2025-06-22","2025-07-06"],minHours:2,reviews:[{id:"rv3",author:"Elena V.",avatar:"E",rating:5,date:"2025-05-18",eventType:"Wedding",duration:"4 hours",text:"Hired La Reina remotely for our backyard wedding. My phone into a Bluetooth speaker and the whole reception danced all night. Best decision.",helpful:24},{id:"rv4",author:"Carlos M.",avatar:"C",rating:5,date:"2025-04-01",eventType:"Birthday",duration:"2 hours",text:"She warmed up slow with bachata then went full reggaeton. Crowd was wild. Remote DJ concept works SO well.",helpful:13}],ratingBreakdown:{5:57,4:5,3:2,2:0,1:0}},
  {id:3,name:"Midnight Mack",avatar:"🎩",city:"New York",genres:["Hip-Hop","R&B","Funk"],fee:150,feeUnit:"hr",rating:5.0,reviewCount:112,bio:"Former tour DJ. Now I bring that arena energy straight to your house party — remotely. Plug me into your speakers and step back.",events:["House Party","Birthday","Bar Mitzvah"],available:["2025-06-13","2025-06-20","2025-06-27","2025-07-04"],minHours:2,reviews:[{id:"rv5",author:"Tasha W.",avatar:"T",rating:5,date:"2025-05-20",eventType:"Birthday",duration:"3 hours",text:"We streamed Mack through an airport Bluetooth speaker at a house party. 40 people. Nobody sat down for 3 hours. I'm still getting texts about it.",helpful:39},{id:"rv6",author:"Devon A.",avatar:"D",rating:5,date:"2025-05-01",eventType:"House Party",duration:"2 hours",text:"Remote DJ that actually felt personal. He sent a message before asking about the vibe. Mid-set he dropped a birthday shoutout. A+.",helpful:21}],ratingBreakdown:{5:112,4:0,3:0,2:0,1:0}},
  {id:4,name:"Vesper Vox",avatar:"🌙",city:"Chicago",genres:["Jazz","Disco","Funk","House"],fee:85,feeUnit:"hr",rating:4.7,reviewCount:43,bio:"For dinners that deserve a soundtrack. I craft elegant sets — jazz to disco to deep house — piped privately to your table.",events:["Dinner Party","Anniversary","Corporate"],available:["2025-06-14","2025-06-21","2025-07-12"],minHours:1,reviews:[{id:"rv7",author:"Olivia B.",avatar:"O",rating:5,date:"2025-05-05",eventType:"Dinner Party",duration:"2 hours",text:"Vesper streamed live to our dinner party. Guests kept asking who curated the playlist. When I said it was a live remote DJ they were floored.",helpful:10}],ratingBreakdown:{5:35,4:6,3:2,2:0,1:0}},
  {id:5,name:"Flux",avatar:"⚡",city:"Berlin",genres:["Techno","EDM","House"],fee:180,feeUnit:"hr",rating:4.9,reviewCount:201,bio:"Berlin underground, delivered to your speakers worldwide. I don't do playlists — I play live, I mix live, and your party will feel it.",events:["House Party","Rooftop"],available:["2025-06-28","2025-07-05","2025-07-19"],minHours:3,reviews:[{id:"rv8",author:"Zara F.",avatar:"Z",rating:5,date:"2025-05-15",eventType:"House Party",duration:"4 hours",text:"Flux did a 4-hour remote set for our house party. Real techno, real mixing, real energy — just piped through our sound system. My neighbours filed a complaint. Worth it.",helpful:52}],ratingBreakdown:{5:188,4:10,3:3,2:0,1:0}},
  {id:6,name:"Mama Groove",avatar:"🌺",city:"Atlanta",genres:["Afrobeats","R&B","Pop","Hip-Hop"],fee:80,feeUnit:"hr",rating:4.6,reviewCount:58,bio:"Good vibes, live-mixed and delivered to your speakers. Afrobeats and R&B sets that make every generation dance. Book me, plug in, and enjoy.",events:["House Party","Birthday","Wedding"],available:["2025-06-15","2025-06-22","2025-06-29"],minHours:1,reviews:[{id:"rv9",author:"Keisha J.",avatar:"K",rating:5,date:"2025-05-12",eventType:"Birthday",duration:"2 hours",text:"Mama Groove did a surprise remote set for my mom's birthday. We had her phone plugged into a speaker, nobody knew it was live. My mom cried when she found out. So special.",helpful:28}],ratingBreakdown:{5:46,4:8,3:3,2:1,1:0}},
];

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Logo({ sm, lg }) {
  const size = lg ? 52 : sm ? 28 : 36;
  const fs   = lg ? 30 : sm ? 16 : 21;
  return (
    <div style={{display:"flex",alignItems:"center",gap:sm?7:12}}>
      {/* House + Headphones arc SVG */}
      <svg viewBox="0 0 56 56" width={size} height={size} style={{flexShrink:0}}>
        {/* House body — navy fill */}
        <polygon points="28,4 52,24 52,52 4,52 4,24" fill={C.card} stroke={C.primary} strokeWidth="2"/>
        {/* Roof shadow */}
        <polygon points="28,4 52,24 4,24" fill={C.primary} opacity="0.15"/>
        {/* Door */}
        <rect x="21" y="36" width="14" height="16" rx="2" fill={C.primary} opacity="0.9"/>
        <rect x="23" y="38" width="4"  height="6"  rx="1" fill={C.bg}/>
        <rect x="29" y="38" width="4"  height="6"  rx="1" fill={C.bg}/>
        {/* Headphone arc over house — sits above roofline */}
        <path d="M14,28 Q14,10 28,10 Q42,10 42,28" fill="none" stroke={C.primary} strokeWidth="3" strokeLinecap="round"/>
        {/* Left ear cup */}
        <rect x="10" y="26" width="8" height="12" rx="4" fill={C.primary}/>
        {/* Right ear cup */}
        <rect x="38" y="26" width="8" height="12" rx="4" fill={C.primary}/>
        {/* Roof peak dot */}
        <circle cx="28" cy="10" r="2.5" fill={C.primary}/>
      </svg>
      {/* Wordmark */}
      <div>
        <span style={{
          fontFamily:"'Trebuchet MS','Gill Sans',sans-serif",
          fontSize:fs, fontWeight:900, letterSpacing:-0.5,
          color:C.primary, textTransform:"uppercase",
        }}>Inda</span><span style={{
          fontFamily:"'Trebuchet MS','Gill Sans',sans-serif",
          fontSize:fs, fontWeight:900, letterSpacing:-0.5,
          color:C.text, textTransform:"uppercase",
        }}>house</span>
      </div>
    </div>
  );
}


function Btn({children,onClick,variant="primary",disabled,full,sm,sx={}}) {
  const v={primary:{background:C.primary,color:"#fff"},outline:{background:"transparent",color:C.yellow,border:`1px solid ${C.yellow}`},ghost:{background:C.muted,color:C.text},red:{background:C.red,color:"#fff"},green:{background:C.green,color:"#000"}};
  return <button onClick={onClick} disabled={disabled} style={{...v[variant],border:v[variant].border||"none",padding:sm?"7px 14px":"12px 22px",borderRadius:6,fontSize:sm?11:13,fontWeight:800,fontFamily:"'Impact','Arial Black',sans-serif",letterSpacing:0.5,cursor:disabled?"not-allowed":"pointer",width:full?"100%":undefined,opacity:disabled?0.4:1,textTransform:"uppercase",...sx}}>{children}</button>;
}

function Badge({children,color}) {
  const col=color||C.yellow;
  return <span style={{background:col+"18",color:col,border:`1px solid ${col}30`,padding:"3px 9px",borderRadius:4,fontSize:11,fontWeight:700,letterSpacing:0.3,whiteSpace:"nowrap",textTransform:"uppercase"}}>{children}</span>;
}

function Input({label,type="text",value,onChange,placeholder,options,required,note}) {
  const s={width:"100%",boxSizing:"border-box",background:"#0A1322",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px",color:C.text,fontFamily:"inherit",fontSize:14,outline:"none",marginTop:5};
  return (
    <div style={{marginBottom:14}}>
      <label style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase"}}>{label}{required&&<span style={{color:C.yellow}}> *</span>}</label>
      {note&&<div style={{fontSize:11,color:C.sub,marginTop:3,marginBottom:2}}>{note}</div>}
      {type==="select"?<select value={value} onChange={e=>onChange(e.target.value)} style={{...s,cursor:"pointer"}}><option value="">Select…</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>
      :type==="textarea"?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{...s,minHeight:80,resize:"vertical"}}/>
      :<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={s}/>}
    </div>
  );
}

function Pills({options,selected,onChange}) {
  return <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:7}}>{options.map(g=>{const on=selected.includes(g);return <button key={g} onClick={()=>on?onChange(selected.filter(x=>x!==g)):onChange([...selected,g])} style={{background:on?C.yellow:"#0C1528",color:on?"#000":C.sub,border:`1px solid ${on?C.yellow:C.border}`,padding:"4px 11px",borderRadius:4,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",textTransform:"uppercase"}}>{g}</button>;})}</div>;
}

function StarRating({value,onChange,size=22}) {
  const [h,setH]=useState(0);
  return <div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(n=><span key={n} onClick={()=>onChange?.(n)} onMouseEnter={()=>onChange&&setH(n)} onMouseLeave={()=>onChange&&setH(0)} style={{fontSize:size,cursor:onChange?"pointer":"default",color:n<=(h||value)?C.yellow:C.muted,transition:"color 0.1s,transform 0.1s",transform:h===n&&onChange?"scale(1.25)":"scale(1)",display:"inline-block",lineHeight:1}}>★</span>)}</div>;
}

function RatingBar({label,count,total}) {
  const pct=total>0?(count/total)*100:0;
  return <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:6}}><span style={{fontSize:12,color:C.sub,minWidth:14,textAlign:"right"}}>{label}</span><span style={{fontSize:11,color:C.yellow}}>★</span><div style={{flex:1,height:5,background:C.muted,borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:C.yellow,borderRadius:3,transition:"width 0.5s"}}/></div><span style={{fontSize:11,color:C.sub2,minWidth:22}}>{count}</span></div>;
}

function Waveform({active,color=C.yellow,bars=30,h=44}) {
  const [vals,setVals]=useState(()=>Array.from({length:bars},()=>Math.random()*50+10));
  useEffect(()=>{
    if(!active) return;
    const id=setInterval(()=>setVals(Array.from({length:bars},()=>Math.random()*85+8)),110);
    return ()=>clearInterval(id);
  },[active]);
  return <div style={{display:"flex",gap:2,alignItems:"center",height:h}}>{vals.map((v,i)=><div key={i} style={{width:3,height:`${active?v:20}%`,background:active?color:C.muted,borderRadius:2,transition:"height 0.11s ease"}}/>)}</div>;
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {n:"01",icon:"🔍",title:"Browse & Choose",desc:"Filter DJs by music genre, event type, and hourly rate. Read real reviews from hosts who've already booked them remotely."},
    {n:"02",icon:"📅",title:"Book a Time Slot",desc:"Pick a date, set the hours you need, and agree on the total fee. The DJ confirms your private session within 24h."},
    {n:"03",icon:"📱",title:"Open the App at Party Time",desc:"At the agreed start time, the DJ goes live in your private session. Open Indahouse on your phone or laptop and hit Play."},
    {n:"04",icon:"🔊",title:"Plug In & Party",desc:"Connect your phone to your Bluetooth speaker, soundbar, or aux input. The DJ's live mix fills your space — they're remote, but it feels live."},
    {n:"05",icon:"🎵",title:"Request Songs & Vibe",desc:"Send song requests through the app. The DJ reads them live and weaves them into the mix."},
    {n:"06",icon:"⭐",title:"Rate & Review",desc:"After the session ends, rate your DJ. Your review helps the next host pick the right one."},
  ];
  return (
    <div style={{padding:"72px 24px",maxWidth:960,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <div style={{fontSize:10,letterSpacing:6,color:C.yellow,textTransform:"uppercase",marginBottom:12}}>How It Works</div>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:"clamp(28px,5vw,42px)",letterSpacing:-1,textTransform:"uppercase"}}>Your DJ. Your Speakers.<br/>Any Party. Anywhere.</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
        {steps.map(({n,icon,title,desc})=>(
          <div key={n} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:24,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-8,right:4,fontFamily:"'Impact','Arial Black',sans-serif",fontSize:64,color:C.yellow+"08",lineHeight:1}}>{n}</div>
            <div style={{fontSize:28,marginBottom:12}}>{icon}</div>
            <div style={{fontWeight:800,fontSize:15,marginBottom:8}}>{title}</div>
            <div style={{fontSize:13,color:C.sub,lineHeight:1.75}}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({onNav}) {
  return (
    <div>
      {/* Hero */}
      <div style={{minHeight:"95vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"60px 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${C.yellow}05 1px,transparent 1px)`,backgroundSize:"30px 30px",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",width:560,height:560,background:`radial-gradient(circle,${C.primary}0c 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{marginBottom:28,display:"flex",justifyContent:"center"}}><Logo/></div>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:C.yellowDim,border:`1px solid ${C.yellowBorder}`,borderRadius:20,padding:"6px 16px",marginBottom:24}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:C.green,boxShadow:`0 0 6px ${C.green}`}}/>
            <span style={{fontSize:11,color:C.green,fontWeight:800,letterSpacing:2,textTransform:"uppercase"}}>Remote DJ Booking — No DJ Required On-Site</span>
          </div>
          <h1 style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:"clamp(48px,10vw,96px)",fontWeight:900,letterSpacing:-3,lineHeight:0.92,margin:"0 0 24px",textTransform:"uppercase"}}>
            A Live DJ.<br/><span style={{color:C.yellow}}>Your Speakers.</span><br/>Any Party.
          </h1>
          <p style={{fontSize:16,color:C.sub,maxWidth:460,margin:"0 auto 40px",lineHeight:1.75}}>
            Book a professional DJ to perform live and remotely for your private event. They mix live from their studio — you stream it through your speakers. No travel. No setup. Just music.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:52}}>
            <Btn onClick={()=>onNav("browse")}>Browse DJs →</Btn>
            <Btn onClick={()=>onNav("signup-dj")} variant="outline">Join as DJ</Btn>
          </div>
          {/* Value props */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,maxWidth:760,margin:"0 auto"}}>
            {[
              {icon:"🎙","title":"Live Mix","desc":"Real-time live mixing, not a playlist"},
              {icon:"📱","title":"Stream to Speakers","desc":"Phone → Bluetooth, AUX, or Chromecast"},
              {icon:"🎵","title":"Song Requests","desc":"Send requests, DJ weaves them in live"},
              {icon:"💰","title":"Pay by the Hour","desc":"Agree on duration & fee before booking"},
            ].map(({icon,title,desc})=>(
              <div key={title} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:18,textAlign:"left"}}>
                <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
                <div style={{fontWeight:800,fontSize:13,marginBottom:4}}>{title}</div>
                <div style={{fontSize:12,color:C.sub,lineHeight:1.6}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HowItWorks/>
      {/* CTA strip */}
      <div style={{background:`linear-gradient(135deg,${C.primary},#FF4500)`,padding:"52px 24px",textAlign:"center"}}>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:"clamp(26px,4vw,40px)",color:"#fff",letterSpacing:-1,marginBottom:20,textTransform:"uppercase"}}>The DJ is in da house.<br/>Even when they're not.</div>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <Btn onClick={()=>onNav("browse")} sx={{background:"#070D1C",color:C.primary}}>Book a DJ Now →</Btn>
          <Btn onClick={()=>onNav("signup-dj")} sx={{background:"transparent",color:"#fff",border:"2px solid rgba(255,255,255,0.6)"}}>Become a Remote DJ</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
// ─── SOCIAL AUTH BUTTONS ──────────────────────────────────────────────────────
function SocialAuthButtons({ onGoogle, onApple, label="Continue" }) {
  return (
    <div>
      {/* Divider */}
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"18px 0"}}>
        <div style={{flex:1,height:1,background:C.border}}/>
        <span style={{fontSize:11,color:C.sub,letterSpacing:2,textTransform:"uppercase"}}>or {label} with</span>
        <div style={{flex:1,height:1,background:C.border}}/>
      </div>
      {/* Google */}
      <button onClick={onGoogle} style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:12,
        background:"#fff", color:"#1a1a1a", border:"1px solid #ddd",
        borderRadius:10, padding:"12px 16px", cursor:"pointer",
        fontSize:13, fontWeight:700, fontFamily:"inherit", marginBottom:10,
        boxShadow:"0 1px 4px rgba(0,0,0,0.15)", transition:"box-shadow 0.2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 3px 10px rgba(0,0,0,0.2)"}
        onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.15)"}
      >
        {/* Google SVG logo */}
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Continue with Google
      </button>
      {/* Apple */}
      <button onClick={onApple} style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:12,
        background:"#000", color:"#fff", border:"1px solid #333",
        borderRadius:10, padding:"12px 16px", cursor:"pointer",
        fontSize:13, fontWeight:700, fontFamily:"inherit",
        boxShadow:"0 1px 4px rgba(0,0,0,0.3)", transition:"box-shadow 0.2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 3px 10px rgba(0,0,0,0.5)"}
        onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.3)"}
      >
        {/* Apple SVG logo */}
        <svg width="16" height="18" viewBox="0 0 814 1000" fill="#fff">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 651.9 0 541.7 0 436.7c0-157.4 102.6-240.8 203.3-240.8 60.7 0 111.3 39.8 147.1 39.8 33.5 0 90.2-42.2 159.1-42.2 60.5 0 127.3 22.2 171.7 81.1zm-186.7-84.1c-28.9-36.8-79.2-64.9-124.9-64.9-6.2 0-12.5.5-18.6 1.5 1.7-53.8 32.1-112.6 68.9-148.5 44-42.5 108.1-69.5 163.5-69.5 4.7 0 9.5.3 14.2.8-2.1 56.1-30.4 113.1-68 151.4-32.7 33.6-83.7 61.6-135.1 129.2z"/>
        </svg>
        Continue with Apple
      </button>
    </div>
  );
}

function AuthForm({title,subtitle,fields,onSubmit,switchLabel,onSwitch,cta,onGoogle,onApple}) {
  const [vals,setVals]=useState({});
  return (
    <div style={{maxWidth:480,margin:"52px auto",padding:"0 20px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:26,color:C.yellow,textTransform:"uppercase",letterSpacing:-0.5,marginBottom:6}}>{title}</div>
        <div style={{color:C.sub,fontSize:13}}>{subtitle}</div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:28}}>
        {/* Social auth at the top */}
        <SocialAuthButtons onGoogle={onGoogle} onApple={onApple} label="sign up"/>
        {fields.map(f=>
          f.type==="genres"?<div key={f.key} style={{marginBottom:14}}><label style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase"}}>Music Genres *</label><Pills options={GENRES} selected={vals[f.key]||[]} onChange={v=>setVals(p=>({...p,[f.key]:v}))}/></div>
          :f.type==="events"?<div key={f.key} style={{marginBottom:14}}><label style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase"}}>Event Types</label><Pills options={EVENT_TYPES} selected={vals[f.key]||[]} onChange={v=>setVals(p=>({...p,[f.key]:v}))}/></div>
          :<Input key={f.key} {...f} value={vals[f.key]||""} onChange={v=>setVals(p=>({...p,[f.key]:v}))}/>
        )}
        <Btn onClick={()=>onSubmit(vals)} full sx={{marginTop:6}}>{cta}</Btn>
        <div style={{textAlign:"center",marginTop:14,fontSize:13,color:C.sub}}>{switchLabel} <span onClick={onSwitch} style={{color:C.yellow,cursor:"pointer",fontWeight:700}}>click here</span></div>
      </div>
    </div>
  );
}


// ─── REVIEW CARD ──────────────────────────────────────────────────────────────
function ReviewCard({review,onHelpful}) {
  const [marked,setMarked]=useState(false);
  return (
    <div style={{background:"#0A1020",border:`1px solid ${C.border}`,borderRadius:10,padding:18,marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:"#000",flexShrink:0}}>{review.avatar}</div>
          <div>
            <div style={{fontWeight:700,fontSize:13}}>{review.author}</div>
            <div style={{fontSize:11,color:C.sub,marginTop:1}}>{review.date} · {review.eventType}{review.duration?` · ${review.duration}`:""}</div>
          </div>
        </div>
        <StarRating value={review.rating} size={13}/>
      </div>
      <p style={{fontSize:13,color:"#999",lineHeight:1.8,margin:"0 0 10px"}}>{review.text}</p>
      <button onClick={()=>{if(!marked){setMarked(true);onHelpful?.(review.id);}}} style={{background:marked?C.yellowDim:"transparent",color:marked?C.yellow:C.sub,border:`1px solid ${marked?C.yellowBorder:C.border}`,padding:"4px 11px",borderRadius:4,cursor:marked?"default":"pointer",fontSize:11,fontFamily:"inherit",fontWeight:700}}>
        👍 Helpful ({review.helpful+(marked?1:0)})
      </button>
    </div>
  );
}

// ─── WRITE REVIEW ─────────────────────────────────────────────────────────────
const OVR={position:"fixed",inset:0,background:"#000d",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:16};
const MOD={background:"#0C1528",border:`1px solid ${C.border}`,borderRadius:14,padding:26,width:"100%",maxWidth:440,maxHeight:"90vh",overflowY:"auto"};

function WriteReview({dj,user,booking,onClose,onSubmit}) {
  const [rating,setRating]=useState(0);
  const [text,setText]=useState("");
  const [done,setDone]=useState(false);
  const submit=()=>{
    if(!rating||!text.trim()) return;
    onSubmit({id:genId(),author:user.name,avatar:user.name[0].toUpperCase(),rating,date:new Date().toISOString().slice(0,10),eventType:booking?.eventType||"House Party",duration:booking?.duration||"",text:text.trim(),helpful:0});
    setDone(true);
  };
  if(done) return <div style={OVR}><div style={MOD}><div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:48,marginBottom:12}}>🌟</div><div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:22,color:C.yellow,letterSpacing:1,marginBottom:8}}>REVIEW POSTED!</div><div style={{color:C.sub,fontSize:13,lineHeight:1.7}}>Your review of <strong style={{color:C.yellow}}>{dj.name}</strong> is live.</div><div style={{marginTop:20}}><Btn onClick={onClose} full>Done</Btn></div></div></div></div>;
  return (
    <div style={OVR}><div style={MOD}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:18,color:C.yellow,letterSpacing:1}}>RATE {dj.name.toUpperCase()}</div>
        <button onClick={onClose} style={{background:C.muted,border:"none",color:C.sub,width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:14}}>×</button>
      </div>
      <div style={{display:"flex",gap:12,alignItems:"center",background:"#0A1322",border:`1px solid ${C.border}`,borderRadius:8,padding:14,marginBottom:20}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{dj.avatar}</div>
        <div><div style={{fontWeight:700}}>{dj.name}</div><div style={{fontSize:11,color:C.sub}}>{booking?.eventType} · {booking?.duration}</div></div>
      </div>
      <div style={{marginBottom:18}}>
        <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase",marginBottom:10}}>Overall Rating *</div>
        <StarRating value={rating} onChange={setRating} size={36}/>
        {rating>0&&<div style={{marginTop:8,fontSize:13,color:C.yellow,fontWeight:700}}>{["","Disappointing","Below Average","Good","Great!","Legendary! 🌟"][rating]}</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {["Mix Quality","Song Requests","Audio Quality","Punctuality"].map(c=>(
          <div key={c}><div style={{fontSize:10,color:C.sub,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{c}</div><StarRating value={rating} size={13}/></div>
        ))}
      </div>
      <Input label="Your Review *" type="textarea" value={text} onChange={setText} placeholder={`How was ${dj.name}'s remote set? How did it sound through your speakers?`}/>
      <Btn onClick={submit} disabled={!rating||!text.trim()} full>Post Review</Btn>
    </div></div>
  );
}

// ─── BOOKING MODAL ────────────────────────────────────────────────────────────
function BookingModal({dj,onClose,onConfirm}) {
  const [date,setDate]=useState("");
  const [eventType,setEventType]=useState("");
  const [duration,setDuration]=useState("");
  const [startTime,setStartTime]=useState("");
  const [note,setNote]=useState("");
  const [step,setStep]=useState(1);

  const hours = duration ? parseFloat(duration) : 0;
  const totalFee = hours ? Math.round(dj.fee * hours) : dj.fee;
  const ok = date && eventType && duration && startTime;

  if(step===2) return (
    <div style={OVR}><div style={MOD}>
      <div style={{textAlign:"center",padding:"14px 0"}}>
        <div style={{fontSize:44,marginBottom:10}}>🎉</div>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:22,color:C.yellow,letterSpacing:1,marginBottom:10}}>SESSION BOOKED!</div>
        <div style={{color:C.sub,fontSize:13,lineHeight:1.8}}>
          <strong style={{color:C.yellow}}>{dj.name}</strong> will confirm your private session within 24h.<br/>
          At <strong style={{color:C.text}}>{startTime} on {date}</strong>, open Indahouse, go to <em>My Sessions</em>, and hit <strong style={{color:C.green}}>Play</strong> to start streaming their live mix to your speakers.
        </div>
        <div style={{background:"#0A1322",border:`1px solid ${C.border}`,borderRadius:8,padding:16,marginTop:18,textAlign:"left"}}>
          {[["DJ",dj.name],["Date",date],["Start Time",startTime],["Duration",duration],["Event",eventType],["Session Fee",`$${totalFee}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <span style={{color:C.sub}}>{k}</span><span style={{fontWeight:700,color:k==="Session Fee"?C.yellow:C.text}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{background:C.greenDim,border:`1px solid ${C.green}30`,borderRadius:8,padding:12,marginTop:14,fontSize:12,color:C.green,lineHeight:1.6}}>
          💡 <strong>Setup tip:</strong> Connect your phone to a Bluetooth speaker or AUX-in for the best experience. The DJ will stream live audio directly through the app.
        </div>
        <div style={{marginTop:18}}><Btn onClick={()=>{onConfirm({dj,date,startTime,duration,eventType,note,fee:totalFee});onClose();}} full>Got It — See My Sessions</Btn></div>
      </div>
    </div></div>
  );

  return (
    <div style={OVR}><div style={MOD}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div>
          <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:17,color:C.yellow,letterSpacing:1}}>BOOK PRIVATE SESSION</div>
          <div style={{fontSize:12,color:C.sub}}>{dj.name} · ${dj.fee}/hr · min {dj.minHours}h</div>
        </div>
        <button onClick={onClose} style={{background:C.muted,border:"none",color:C.sub,width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:14}}>×</button>
      </div>

      {/* DJ strip */}
      <div style={{display:"flex",gap:12,alignItems:"center",background:"#0A1322",border:`1px solid ${C.border}`,borderRadius:8,padding:14,marginBottom:18}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{dj.avatar}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800}}>{dj.name}</div>
          <div style={{fontSize:11,color:C.sub}}>{dj.city} · {dj.genres.slice(0,3).join(", ")}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:18,color:C.yellow}}>${dj.fee}<span style={{fontSize:11,color:C.sub}}>/hr</span></div>
        </div>
      </div>

      <Input label="Event Date" type="select" value={date} onChange={setDate} required options={dj.available}/>
      <Input label="Session Start Time" type="time" value={startTime} onChange={setStartTime} required note="The DJ goes live at this exact time"/>
      <Input label="Duration" type="select" value={duration} onChange={setDuration} required options={DURATIONS} note={`Min ${dj.minHours} hour${dj.minHours>1?"s":""}`}/>
      <Input label="Event Type" type="select" value={eventType} onChange={setEventType} required options={EVENT_TYPES}/>
      <Input label="Notes for DJ (optional)" type="textarea" value={note} onChange={setNote} placeholder="Vibe, genres to focus on, song requests to start with, anything else…"/>

      {/* Fee summary */}
      {duration && (
        <div style={{background:"#0A1322",border:`1px solid ${C.border}`,borderRadius:8,padding:14,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}>
            <span style={{color:C.sub}}>${dj.fee}/hr × {duration}</span>
            <span style={{fontWeight:800,color:C.yellow}}>${totalFee}</span>
          </div>
          <div style={{fontSize:11,color:C.sub}}>No platform fee. Pay the DJ directly before the session starts.</div>
        </div>
      )}

      <Btn onClick={()=>setStep(2)} disabled={!ok} full>Confirm Booking →</Btn>
    </div></div>
  );
}

// ─── DJ CARD ──────────────────────────────────────────────────────────────────
function DJCard({dj,onBook,onProfile}) {
  const recent=dj.reviews[0];
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",display:"flex",flexDirection:"column",transition:"border-color 0.2s,transform 0.2s"}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=C.yellow+"44";e.currentTarget.style.transform="translateY(-3px)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="";}}>
      <div style={{height:3,background:`linear-gradient(90deg,${C.yellow},${C.primary}55)`}}/>
      <div style={{padding:20,flex:1}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{dj.avatar}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
              <div style={{fontWeight:800,fontSize:15}}>{dj.name}</div>
              <div><span style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:17,color:C.yellow}}>${dj.fee}</span><span style={{fontSize:11,color:C.sub}}>/hr</span></div>
            </div>
            <div style={{fontSize:11,color:C.sub}}>📍 {dj.city} · min {dj.minHours}h</div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginTop:5}}>
              <StarRating value={Math.round(dj.rating)} size={11}/>
              <span style={{fontSize:11,fontWeight:800}}>{dj.rating}</span>
              <span style={{fontSize:10,color:C.sub}}>({dj.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:12}}>{dj.genres.map(g=><Badge key={g}>{g}</Badge>)}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>{dj.events.slice(0,3).map(e=><Badge key={e} color={C.blue}>{e}</Badge>)}</div>
        {recent&&(
          <div style={{marginTop:12,background:"#0A1322",border:`1px solid ${C.border}`,borderRadius:8,padding:10}}>
            <div style={{fontSize:10,color:C.yellow,fontWeight:800,marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>★ Latest Review</div>
            <div style={{fontSize:11,color:C.sub,lineHeight:1.6,fontStyle:"italic"}}>"{recent.text.slice(0,100)}…"</div>
            <div style={{fontSize:10,color:C.sub2,marginTop:4}}>— {recent.author} · {recent.duration}</div>
          </div>
        )}
        <div style={{marginTop:10,fontSize:11,color:C.green,fontWeight:700}}>● {dj.available.length} dates available</div>
      </div>
      <div style={{padding:"0 20px 18px",display:"flex",gap:8}}>
        <Btn onClick={()=>onProfile(dj)} variant="ghost" sm>Profile</Btn>
        <div style={{flex:1}}><Btn onClick={()=>onBook(dj)} full sm>Book Session →</Btn></div>
      </div>
    </div>
  );
}

// ─── BROWSE ───────────────────────────────────────────────────────────────────
function Browse({djs,onBook,onProfile}) {
  const [genreF,setGenreF]=useState([]);
  const [eventF,setEventF]=useState("");
  const [maxFee,setMaxFee]=useState(200);
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("rating");
  const filtered=djs.filter(dj=>{
    if(search&&!dj.name.toLowerCase().includes(search.toLowerCase())&&!dj.city.toLowerCase().includes(search.toLowerCase())) return false;
    if(genreF.length&&!genreF.some(g=>dj.genres.includes(g))) return false;
    if(eventF&&!dj.events.includes(eventF)) return false;
    if(dj.fee>maxFee) return false;
    return true;
  }).sort((a,b)=>sort==="rating"?b.rating-a.rating:sort==="reviews"?b.reviewCount-a.reviewCount:a.fee-b.fee);
  return (
    <div style={{maxWidth:1020,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{marginBottom:22}}>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:28,letterSpacing:-0.5,textTransform:"uppercase",marginBottom:4}}>Browse Remote DJs</div>
        <div style={{color:C.sub,fontSize:13}}>{filtered.length} DJs available for private remote sessions</div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:20,marginBottom:24}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:14}}>
          <Input label="Search" value={search} onChange={setSearch} placeholder="Name or city…"/>
          <Input label="Event Type" type="select" value={eventF} onChange={setEventF} options={EVENT_TYPES}/>
          <div>
            <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase"}}>Max Hourly Rate</div>
            <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:22,color:C.yellow,margin:"6px 0 4px"}}>${maxFee}/hr</div>
            <input type="range" min={50} max={200} step={5} value={maxFee} onChange={e=>setMaxFee(+e.target.value)} style={{width:"100%",accentColor:C.yellow}}/>
          </div>
          <div>
            <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase",marginBottom:7}}>Sort By</div>
            <div style={{display:"flex",gap:5}}>
              {[["rating","★"],["reviews","Reviews"],["fee","Price"]].map(([v,l])=><button key={v} onClick={()=>setSort(v)} style={{background:sort===v?C.yellow:"#0C1528",color:sort===v?"#000":C.sub,border:`1px solid ${sort===v?C.yellow:C.border}`,padding:"4px 9px",borderRadius:4,cursor:"pointer",fontSize:11,fontWeight:800,fontFamily:"inherit",textTransform:"uppercase"}}>{l}</button>)}
            </div>
          </div>
        </div>
        <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase",marginBottom:7}}>Genres</div>
        <Pills options={GENRES} selected={genreF} onChange={setGenreF}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:16}}>
        {filtered.map(dj=><DJCard key={dj.id} dj={dj} onBook={onBook} onProfile={onProfile}/>)}
        {filtered.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:60,color:C.sub}}>No DJs match your filters.</div>}
      </div>
    </div>
  );
}

// ─── DJ PROFILE ───────────────────────────────────────────────────────────────
function DJProfile({dj,user,onBook,onReview,onBack,onHelpful,reviewOverrides}) {
  const [tab,setTab]=useState("about");
  const reviews=[...(reviewOverrides[dj.id]||[]),...dj.reviews.filter(r=>!(reviewOverrides[dj.id]||[]).find(x=>x.id===r.id))];
  const bd=dj.ratingBreakdown||{};
  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"28px 20px"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.sub,cursor:"pointer",fontSize:13,fontFamily:"inherit",padding:0,marginBottom:18}}>← Back</button>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:26,marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,background:C.yellow+"07",borderRadius:"50%"}}/>
        <div style={{display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0}}>{dj.avatar}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:26,letterSpacing:-0.5,marginBottom:2}}>{dj.name}</div>
            <div style={{fontSize:12,color:C.sub,marginBottom:10}}>📍 {dj.city} · Remote DJ</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{dj.genres.map(g=><Badge key={g}>{g}</Badge>)}</div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:5}}><StarRating value={Math.round(dj.rating)} size={13}/><span style={{fontWeight:800,fontSize:15}}>{dj.rating}</span><span style={{color:C.sub,fontSize:12}}>({dj.reviewCount} reviews)</span></div>
              <Badge color={C.green}>● {dj.available.length} dates open</Badge>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:32,color:C.yellow,lineHeight:1}}>${dj.fee}<span style={{fontSize:14,color:C.sub}}>/hr</span></div>
            <div style={{fontSize:11,color:C.sub,marginBottom:4}}>min {dj.minHours} hour{dj.minHours>1?"s":""}</div>
            <div style={{fontSize:11,color:C.sub,marginBottom:14}}>No travel · Streams live to you</div>
            <Btn onClick={()=>onBook(dj)}>Book Session →</Btn>
          </div>
        </div>
      </div>
      {/* How remote works for this DJ */}
      <div style={{background:C.greenDim,border:`1px solid ${C.green}30`,borderRadius:10,padding:16,marginBottom:16,display:"flex",gap:12,alignItems:"flex-start"}}>
        <div style={{fontSize:22,flexShrink:0}}>📱</div>
        <div>
          <div style={{fontWeight:800,fontSize:13,marginBottom:4,color:C.green}}>How a session with {dj.name} works</div>
          <div style={{fontSize:12,color:C.sub,lineHeight:1.7}}>You book a time slot. At your agreed start time, {dj.name} goes live from their studio. Open Indahouse → My Sessions → hit Play. Stream directly to your Bluetooth speaker, soundbar, or AUX input. They mix live the whole session — you can send song requests through the app.</div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:18}}>
        {[["about","About"],["reviews",`Reviews (${reviews.length})`]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{background:"none",border:"none",borderBottom:tab===id?`2px solid ${C.yellow}`:"2px solid transparent",color:tab===id?C.yellow:C.sub,padding:"10px 18px",cursor:"pointer",fontSize:12,fontWeight:800,fontFamily:"inherit",textTransform:"uppercase",letterSpacing:1,marginBottom:-1}}>{label}</button>
        ))}
      </div>
      {tab==="about"&&(
        <div style={{display:"grid",gap:12}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:22}}><div style={{fontSize:10,letterSpacing:4,color:C.sub,textTransform:"uppercase",marginBottom:12}}>Bio</div><p style={{fontSize:14,color:"#999",lineHeight:1.8,margin:0}}>{dj.bio}</p></div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:22}}><div style={{fontSize:10,letterSpacing:4,color:C.sub,textTransform:"uppercase",marginBottom:12}}>Event Types</div><div style={{display:"flex",flexWrap:"wrap",gap:7}}>{dj.events.map(e=><Badge key={e} color={C.blue}>{e}</Badge>)}</div></div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:22}}><div style={{fontSize:10,letterSpacing:4,color:C.sub,textTransform:"uppercase",marginBottom:12}}>Available Dates</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{dj.available.map(d=><div key={d} style={{background:C.greenDim,border:`1px solid ${C.green}40`,color:C.green,padding:"6px 14px",borderRadius:6,fontSize:12,fontWeight:700}}>{d}</div>)}</div></div>
        </div>
      )}
      {tab==="reviews"&&(
        <div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:22,marginBottom:16}}>
            <div style={{display:"flex",gap:28,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:56,color:C.yellow,lineHeight:1}}>{dj.rating}</div>
                <StarRating value={Math.round(dj.rating)} size={18}/>
                <div style={{fontSize:12,color:C.sub,marginTop:6}}>{dj.reviewCount} reviews</div>
              </div>
              <div style={{flex:1,minWidth:180}}>{[5,4,3,2,1].map(n=><RatingBar key={n} label={n} count={bd[n]||0} total={dj.reviewCount}/>)}</div>
            </div>
          </div>
          {user&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div><div style={{fontWeight:700,fontSize:13}}>Had a session with {dj.name}?</div><div style={{fontSize:11,color:C.sub,marginTop:2}}>Help other hosts find their sound</div></div>
            <Btn onClick={()=>onReview(dj)} sm>✍ Write Review</Btn>
          </div>}
          {reviews.length===0
            ?<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:48,textAlign:"center",color:C.sub}}>No reviews yet — be the first!</div>
            :reviews.map(r=><ReviewCard key={r.id} review={r} onHelpful={id=>onHelpful(dj.id,id)}/>)
          }
        </div>
      )}
    </div>
  );
}

// ─── BIG VISUALIZER BARS ─────────────────────────────────────────────────────
// ─── FULLSCREEN LIVE SESSION ──────────────────────────────────────────────────
// ─── DEEP HOUSE AUDIO ENGINE (Web Audio API) ─────────────────────────────────
function useDeepHouseEngine(playing, vol) {
  const ctxRef    = useRef(null);
  const nodesRef  = useRef({});
  const startedRef= useRef(false);

  const stop = () => {
    try {
      const n = nodesRef.current;
      [n.kick, n.bass, n.hat, n.pad, n.arp].forEach(src => { try { src?.stop(); } catch(e){} });
      ctxRef.current?.close();
    } catch(e) {}
    ctxRef.current = null;
    nodesRef.current = {};
    startedRef.current = false;
  };

  useEffect(() => {
    if (!playing) { stop(); return; }
    if (startedRef.current) return;
    startedRef.current = true;

    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = vol / 100;
    master.connect(ctx.destination);

    // ── REVERB impulse ──────────────────────────────────────────────────────
    const makeReverb = (dur=2.5, decay=2) => {
      const len = ctx.sampleRate * dur;
      const buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/len, decay);
      }
      const conv = ctx.createConvolver(); conv.buffer = buf; return conv;
    };

    // ── COMPRESSOR ──────────────────────────────────────────────────────────
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.knee.value = 8;
    comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.15;
    comp.connect(master);

    const rev = makeReverb(3, 1.8);
    const revGain = ctx.createGain(); revGain.gain.value = 0.18;
    rev.connect(revGain); revGain.connect(comp);

    const BPM = 124; // deep house tempo
    const BEAT = 60 / BPM;
    const BAR  = BEAT * 4;
    const now  = ctx.currentTime + 0.05;

    // ── KICK DRUM (deep 4/4) ────────────────────────────────────────────────
    const scheduleKick = (t) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(comp);
      o.frequency.setValueAtTime(180, t);
      o.frequency.exponentialRampToValueAtTime(45, t + 0.08);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(1.1, t + 0.002);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      o.start(t); o.stop(t + 0.4);
      // Click transient
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.01, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * (1 - i/d.length);
      const src = ctx.createBufferSource(); src.buffer = buf;
      const cg = ctx.createGain(); cg.gain.value = 0.6;
      src.connect(cg); cg.connect(comp);
      src.start(t);
    };

    // ── DEEP BASS (sub + mid layer) ─────────────────────────────────────────
    const scheduleNote = (freq, t, dur, type='sine', gainVal=0.35, dest=comp) => {
      const o = ctx.createOscillator(); o.type = type;
      const g = ctx.createGain();
      o.frequency.value = freq;
      o.connect(g); g.connect(dest);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gainVal, t + 0.01);
      g.gain.setValueAtTime(gainVal, t + dur - 0.05);
      g.gain.linearRampToValueAtTime(0, t + dur);
      o.start(t); o.stop(t + dur + 0.05);
    };

    // ── HI-HAT (noise bursts) ───────────────────────────────────────────────
    const scheduleHat = (t, open=false) => {
      const buf = ctx.createBuffer(1, ctx.sampleRate * (open ? 0.18 : 0.04), ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random()*2-1;
      const src = ctx.createBufferSource(); src.buffer = buf;
      const filter = ctx.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 8000;
      const g = ctx.createGain(); g.gain.value = open ? 0.12 : 0.07;
      src.connect(filter); filter.connect(g); g.connect(comp);
      src.start(t);
    };

    // ── PAD CHORD (lush deep house chord) ──────────────────────────────────
    const CHORD_FREQS = [
      [55.0, 82.4, 98.0, 130.8],  // Am7 sub octave
      [61.7, 92.5, 110.0, 138.6], // Dm9
    ];
    const schedulePad = (chord, t, dur) => {
      chord.forEach((freq, i) => {
        const detune = [0, 4, -3, 7][i];
        scheduleNote(freq, t, dur, 'sine', 0.08, rev);
        scheduleNote(freq * 2, t, dur, 'triangle', 0.04 + i*0.01, rev);
        const o2 = ctx.createOscillator(); o2.type = 'sawtooth';
        o2.frequency.value = freq * 2;
        o2.detune.value = detune;
        const g2 = ctx.createGain(); const flt = ctx.createBiquadFilter();
        flt.type = 'lowpass'; flt.frequency.value = 1200; flt.Q.value = 2;
        o2.connect(flt); flt.connect(g2); g2.connect(rev);
        g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(0.025, t+0.4);
        g2.gain.setValueAtTime(0.025, t+dur-0.4); g2.gain.linearRampToValueAtTime(0, t+dur);
        o2.start(t); o2.stop(t+dur+0.1);
      });
    };

    // ── ARP / MELODIC HOOK ──────────────────────────────────────────────────
    const ARP_NOTES = [220, 261.6, 293.7, 329.6, 220, 196.0, 261.6, 246.9];

    // ── MAIN LOOP ───────────────────────────────────────────────────────────
    const BARS = 32; // schedule 32 bars
    for (let bar = 0; bar < BARS; bar++) {
      const bt = now + bar * BAR;
      const section = Math.floor(bar / 8) % 4; // 0=intro,1=build,2=peak,3=break

      // Kicks — 4 on the floor
      for (let beat = 0; beat < 4; beat++) {
        if (section > 0 || beat % 2 === 0) scheduleKick(bt + beat * BEAT);
      }

      // Bass line (every bar from section 1)
      if (section >= 1) {
        const bassNotes = [
          [55.0, 0.0], [55.0, 0.5], [41.2, 1.0], [55.0, 1.5],
          [55.0, 2.0], [61.7, 2.5], [41.2, 3.0], [55.0, 3.5],
        ];
        bassNotes.forEach(([freq, offset]) => {
          scheduleNote(freq, bt + offset * BEAT, BEAT * 0.42, 'sine', 0.5);
          scheduleNote(freq * 2, bt + offset * BEAT, BEAT * 0.38, 'triangle', 0.12);
        });
      }

      // Hi-hats 8th notes
      for (let e = 0; e < 8; e++) {
        if (section >= 1) scheduleHat(bt + e * BEAT * 0.5, e % 4 === 2);
      }

      // Pad chords — change every 4 bars
      const chordIdx = Math.floor(bar / 4) % 2;
      if (section >= 1) schedulePad(CHORD_FREQS[chordIdx], bt, BAR - 0.1);

      // Arp melody — from section 2
      if (section >= 2) {
        ARP_NOTES.forEach((freq, i) => {
          scheduleNote(freq, bt + i * BEAT * 0.5, BEAT * 0.35, 'triangle', 0.09, rev);
        });
      }
    }

    return () => stop();
  }, [playing]);

  // Volume control
  useEffect(() => {
    const n = nodesRef.current;
    if (n.masterGain) n.masterGain.gain.setTargetAtTime(vol / 100, ctxRef.current?.currentTime || 0, 0.05);
  }, [vol]);
}

// ─── BIG VISUALIZER ───────────────────────────────────────────────────────────
function BigVisualizer({active, bpm=124}) {
  const BARS = 52;
  const [vals, setVals] = useState(() => Array.from({length:BARS}, () => Math.random()*30+5));
  useEffect(() => {
    if (!active) return;
    const speed = Math.max(50, 160 - bpm);
    const id = setInterval(() => setVals(Array.from({length:BARS}, (_, i) => {
      const c = 1 - Math.abs(i - BARS/2) / (BARS/2);
      return c * (Math.random()*82 + 14) + Math.random()*10 + 3;
    })), speed);
    return () => clearInterval(id);
  }, [active, bpm]);
  return (
    <div style={{display:"flex", gap:3, alignItems:"flex-end", height:"100%", width:"100%"}}>
      {vals.map((v, i) => {
        const c = 1 - Math.abs(i - BARS/2) / (BARS/2);
        const r = Math.round(255 * (0.7 + c * 0.3));
        const g = Math.round(107 * c * 0.8);
        const b = Math.round(26 * (1-c) + 60 * c);
        return <div key={i} style={{flex:1, height:`${active ? v : 6}%`, background:`rgb(${r},${g},${b})`, borderRadius:"2px 2px 0 0", transition:`height ${active ? 0.09 : 0.4}s ease`, minWidth:3}}/>;
      })}
    </div>
  );
}

// ─── ANIMATED DJ TURNTABLE ────────────────────────────────────────────────────
function Turntable({playing, bpm=124, size=220}) {
  const rotation = useRef(0);
  const rafRef   = useRef(null);
  const plateRef = useRef(null);
  const armRef   = useRef(null);

  useEffect(() => {
    const rpm = (bpm / 33.3) * 33.3; // approx 33 RPM scaled to BPM
    const degsPerMs = (rpm * 360) / 60000;
    let last = null;
    const tick = (ts) => {
      if (playing) {
        if (last !== null) rotation.current = (rotation.current + degsPerMs * (ts - last)) % 360;
        if (plateRef.current) plateRef.current.style.transform = `rotate(${rotation.current}deg)`;
        if (armRef.current)   armRef.current.style.transform   = `rotate(${playing ? 28 : 5}deg)`;
      }
      last = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, bpm]);

  const S = size;
  const cx = S/2, cy = S/2, R = S*0.44;

  return (
    <div style={{position:"relative", width:S, height:S, flexShrink:0}}>
      {/* Platter base */}
      <div style={{position:"absolute", inset:0, borderRadius:"50%", background:"#0a1020", border:`3px solid ${C.border}`, boxShadow:`0 0 40px ${C.primary}22, inset 0 0 20px #00000066`}}/>

      {/* Spinning plate */}
      <div ref={plateRef} style={{position:"absolute", inset:8, borderRadius:"50%", overflow:"hidden", willChange:"transform"}}>
        {/* Vinyl grooves */}
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="vinylGrad" cx="50%" cy="50%">
              <stop offset="0%"   stopColor="#1a1a2e"/>
              <stop offset="30%"  stopColor="#111122"/>
              <stop offset="100%" stopColor="#0d0d18"/>
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#vinylGrad)"/>
          {/* Groove rings */}
          {[92,85,78,71,64,57,50,43,36,29].map(r=>(
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={`${C.primary}18`} strokeWidth="0.8"/>
          ))}
          {/* Label */}
          <circle cx="100" cy="100" r="22" fill={C.primary}/>
          <circle cx="100" cy="100" r="18" fill="#0a1020"/>
          <circle cx="100" cy="100" r="14" fill={C.primary} opacity="0.3"/>
          {/* Label text */}
          <text x="100" y="96"  textAnchor="middle" fill="#fff" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">INDAHOUSE</text>
          <text x="100" y="103" textAnchor="middle" fill={`${C.primary}cc`} fontSize="4" fontFamily="sans-serif">DEEP SESSIONS</text>
          <text x="100" y="109" textAnchor="middle" fill={`${C.primary}99`} fontSize="3.5" fontFamily="sans-serif">124 BPM</text>
          {/* Spindle */}
          <circle cx="100" cy="100" r="2.5" fill="#ccc"/>
          {/* Highlight arc */}
          <path d="M 100 8 A 92 92 0 0 1 176 54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Tonearm */}
      <div ref={armRef} style={{position:"absolute", top:"8%", right:"8%", width:"42%", height:"42%", transformOrigin:"90% 10%", transition:"transform 0.8s ease", zIndex:10}}>
        <svg width="100%" height="100%" viewBox="0 0 80 80" overflow="visible">
          {/* Arm pivot */}
          <circle cx="70" cy="8" r="5" fill="#333" stroke={C.border} strokeWidth="1"/>
          <circle cx="70" cy="8" r="2.5" fill={C.primary}/>
          {/* Arm body */}
          <line x1="70" y1="8" x2="12" y2="72" stroke="#555" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Headshell */}
          <rect x="6" y="68" width="14" height="6" rx="2" fill="#444" stroke="#555" strokeWidth="0.5"/>
          {/* Stylus/needle */}
          <line x1="13" y1="74" x2="13" y2="79" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="13" cy="79" r="1.5" fill={C.primary} opacity="0.9"/>
        </svg>
      </div>

      {/* Glow ring when playing */}
      {playing && <div style={{position:"absolute", inset:-4, borderRadius:"50%", border:`2px solid ${C.primary}`, boxShadow:`0 0 20px ${C.primary}55, 0 0 50px ${C.primary}22`, animation:"pulse 2s ease-in-out infinite", pointerEvents:"none"}}/>}
    </div>
  );
}

// ─── DJ VIDEO BACKGROUND ─────────────────────────────────────────────────────
function DJVideoBackground({beat, playing, bpm, vizVals}) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    t: 0,
    knobSpin: 0,
    beatScale: 1,
    headBob: 0, headTilt: 0,
    leftArm: 0, rightArm: 0,
    shoulderBob: 0,
    particles: Array.from({length:55}, () => ({
      x:Math.random(), y:0.75+Math.random()*0.2,
      vx:(Math.random()-0.5)*0.0006, vy:-Math.random()*0.0005-0.0001,
      size:Math.random()*3+1, alpha:Math.random()*0.25+0.05,
    })),
    crowd: Array.from({length:90}, (_,i) => ({
      x:i/90, baseY:0.76+Math.sin(i*1.7)*0.04,
      h:0.055+Math.random()*0.07, phase:Math.random()*Math.PI*2,
      speed:0.9+Math.random()*0.7, skin:Math.random(),
    })),
    lights: [
      {x:0.18, angle:-0.4, sweep:0.007, hue:22,  r:260},
      {x:0.82, angle: 0.3, sweep:-0.005,hue:200, r:240},
      {x:0.50, angle: 0.0, sweep:0.004, hue:35,  r:300},
    ],
    laserAngle: 0,
    eyeBlink: 0, blinkTimer: 0,
    mouthOpen: 0,
  });
  const rafRef  = useRef(null);
  const beatRef = useRef(false);

  useEffect(() => { beatRef.current = beat; }, [beat]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * (window.devicePixelRatio||1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio||1);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (ts) => {
      const s   = stateRef.current;
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas.width, H = canvas.height;
      const w   = W/dpr, h = H/dpr;
      const beat= beatRef.current;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      s.t += 0.016;
      s.laserAngle += 0.008;
      s.blinkTimer += 0.016;
      if (s.blinkTimer > 3.5 + Math.random()) { s.eyeBlink = 1; s.blinkTimer = 0; }
      if (s.eyeBlink > 0) s.eyeBlink = Math.max(0, s.eyeBlink - 0.12);

      // Animate body
      const speed = playing ? 1 : 0.15;
      s.headBob      = Math.sin(s.t * (bpm/60) * Math.PI) * 3.5 * speed;
      s.headTilt     = Math.sin(s.t * 0.7) * 2 * speed;
      s.shoulderBob  = Math.sin(s.t * (bpm/60) * Math.PI * 0.5) * 3 * speed;
      s.leftArm      = Math.sin(s.t * 1.1) * 14 * speed;
      s.rightArm     = Math.sin(s.t * 0.9 + 1.2) * 12 * speed;
      s.mouthOpen    = Math.max(0, Math.sin(s.t * 1.8)) * 2 * speed;
      s.knobSpin    += playing ? (bpm/60) * 0.016 * 6.28 : 0;
      s.beatScale    = beat ? Math.min(s.beatScale+0.04,1.05) : Math.max(s.beatScale-0.015,1);

      // ── Background ──────────────────────────────────────────────────────
      const bg = ctx.createLinearGradient(0,0,0,h);
      bg.addColorStop(0,'#010306');
      bg.addColorStop(0.45,'#030b18');
      bg.addColorStop(1,'#010306');
      ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);

      // ── Stage floor ──────────────────────────────────────────────────────
      const floor = ctx.createLinearGradient(0,h*0.7,0,h);
      floor.addColorStop(0,'rgba(255,107,26,0.07)');
      floor.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=floor; ctx.fillRect(0,h*0.7,w,h*0.3);

      // Floor tiles perspective
      ctx.strokeStyle='rgba(255,107,26,0.06)'; ctx.lineWidth=0.8;
      for(let i=0;i<12;i++){
        const x0=w*(i/12), x1=w*0.5+(x0-w*0.5)*0.15;
        ctx.beginPath(); ctx.moveTo(x0,h*0.7); ctx.lineTo(x1,h*0.85); ctx.stroke();
      }

      // ── Stage lights ────────────────────────────────────────────────────
      s.lights.forEach(lt => {
        lt.angle += lt.sweep * speed;
        const tx = w*(lt.x + Math.sin(lt.angle)*0.3), ty = h*0.68;
        const gr = ctx.createRadialGradient(tx,ty,0,tx,ty,lt.r);
        const al = beat ? 0.22 : 0.09;
        gr.addColorStop(0, `hsla(${lt.hue},100%,65%,${al})`);
        gr.addColorStop(0.5,`hsla(${lt.hue},80%,50%,${al*0.3})`);
        gr.addColorStop(1,'transparent');
        // Cone beam
        ctx.fillStyle=gr;
        ctx.beginPath();
        ctx.moveTo(w*lt.x, h*0.02);
        ctx.lineTo(tx-lt.r*0.45, ty);
        ctx.lineTo(tx+lt.r*0.45, ty);
        ctx.closePath(); ctx.fill();
      });

      // ── Laser beams ─────────────────────────────────────────────────────
      if (playing) {
        for(let i=0;i<8;i++){
          const angle = s.laserAngle + i*Math.PI/4;
          ctx.strokeStyle=`hsla(${15+i*20},100%,60%,${beat?0.4:0.15})`;
          ctx.lineWidth = beat ? 1.2 : 0.6;
          ctx.beginPath();
          ctx.moveTo(w*0.5, h*0.06);
          ctx.lineTo(w*0.5+Math.cos(angle)*w*0.65, h*0.06+Math.sin(angle)*h*0.75);
          ctx.stroke();
        }
      }

      // ── REAL-LOOKING DJ PERSON ───────────────────────────────────────────
      const djX = w*0.5, djY = h*0.42;
      const scale = 1.0 * s.beatScale;
      ctx.save();
      ctx.translate(djX, djY + s.headBob*0.3);
      ctx.scale(scale, scale);

      // --- Shadow under DJ ---
      ctx.fillStyle='rgba(0,0,0,0.45)';
      ctx.beginPath(); ctx.ellipse(0,190,70,14,0,0,Math.PI*2); ctx.fill();

      // --- Legs ---
      const legColors = ['#1a1a2a','#161620'];
      [[-18,0],[18,1]].forEach(([lx,li])=>{
        ctx.fillStyle=legColors[li];
        ctx.beginPath(); ctx.roundRect(lx-11,120,22,85,4); ctx.fill();
        // Shoes
        ctx.fillStyle='#0d0d14';
        ctx.beginPath(); ctx.ellipse(lx+3,205,16,8,0,0,Math.PI*2); ctx.fill();
      });

      // --- Torso (hoodie/jacket) ---
      // Base body
      ctx.fillStyle='#1c1c2e';
      ctx.beginPath(); ctx.roundRect(-38,10,76,118,8); ctx.fill();
      // Jacket texture / zipper
      ctx.fillStyle='#141420';
      ctx.fillRect(-4,14,8,90);
      // Collar
      ctx.fillStyle='#252535';
      ctx.beginPath(); ctx.moveTo(-18,12); ctx.lineTo(0,38); ctx.lineTo(18,12); ctx.closePath(); ctx.fill();
      // Jacket seams
      ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=1;
      [[-38,10,-18,10],[-38,10,-38,128],[38,10,38,128]].forEach(([x1,y1,x2,y2])=>{
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      });

      // --- Shoulders (bob up/down) ---
      const sy = s.shoulderBob;
      // Left shoulder
      ctx.fillStyle='#1c1c2e';
      ctx.beginPath(); ctx.ellipse(-44,22+sy,18,14,Math.PI*0.1,0,Math.PI*2); ctx.fill();
      // Right shoulder
      ctx.beginPath(); ctx.ellipse(44,22-sy,18,14,-Math.PI*0.1,0,Math.PI*2); ctx.fill();

      // --- LEFT ARM (on left deck) ---
      ctx.save();
      ctx.translate(-44, 22+sy);
      ctx.rotate(Math.PI*0.35 + (s.leftArm/180)*Math.PI);
      // Upper arm
      ctx.fillStyle='#1c1c2e';
      ctx.beginPath(); ctx.roundRect(-9,0,18,52,6); ctx.fill();
      // Forearm (slightly lighter for depth)
      ctx.fillStyle='#1e1e30';
      ctx.beginPath(); ctx.roundRect(-8,50,16,44,5); ctx.fill();
      // Wrist / Hand (skin tone)
      ctx.fillStyle='#c8956a';
      ctx.beginPath(); ctx.ellipse(0,96,10,8,0,0,Math.PI*2); ctx.fill();
      // Fingers spread on vinyl
      [-6,-2,2,6].forEach(fx=>{
        ctx.beginPath(); ctx.roundRect(fx-2,93,4,12,2); ctx.fill();
      });
      ctx.restore();

      // --- RIGHT ARM (on mixer/right deck) ---
      ctx.save();
      ctx.translate(44, 22-sy);
      ctx.rotate(-Math.PI*0.3 + (s.rightArm/180)*Math.PI);
      ctx.fillStyle='#1c1c2e';
      ctx.beginPath(); ctx.roundRect(-9,0,18,52,6); ctx.fill();
      ctx.fillStyle='#1e1e30';
      ctx.beginPath(); ctx.roundRect(-8,50,16,44,5); ctx.fill();
      ctx.fillStyle='#c8956a';
      ctx.beginPath(); ctx.ellipse(0,96,10,8,0,0,Math.PI*2); ctx.fill();
      [-6,-2,2,6].forEach(fx=>{
        ctx.beginPath(); ctx.roundRect(fx-2,93,4,12,2); ctx.fill();
      });
      ctx.restore();

      // --- Neck ---
      ctx.fillStyle='#c8956a';
      ctx.beginPath(); ctx.roundRect(-10,-18,20,24,4); ctx.fill();

      // --- Head ---
      ctx.save();
      ctx.translate(s.headTilt*0.5, s.headBob - 70);
      ctx.rotate((s.headTilt/180)*Math.PI*0.5);

      // Head shape
      ctx.fillStyle='#c8956a';
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 32, 0, 0, Math.PI*2);
      ctx.fill();
      // Jawline
      ctx.beginPath();
      ctx.ellipse(0, 18, 20, 16, 0, 0, Math.PI);
      ctx.fill();

      // Hair
      ctx.fillStyle='#1a1008';
      ctx.beginPath();
      ctx.ellipse(0,-24,26,14,0,Math.PI,Math.PI*2);
      ctx.fill();
      // Hair detail / waves
      ctx.strokeStyle='#0d0805'; ctx.lineWidth=3;
      for(let hx=-18;hx<=18;hx+=6){
        ctx.beginPath();
        ctx.arc(hx,-28+Math.sin((hx+18)/6)*3,3,Math.PI,0);
        ctx.stroke();
      }
      // Fade on sides
      ctx.fillStyle='#c8956a';
      [-1,1].forEach(side=>{
        ctx.beginPath();
        ctx.ellipse(side*22,-10,8,18,0,0,Math.PI*2);
        ctx.fill();
      });

      // Eyebrows
      ctx.strokeStyle='#2a1a08'; ctx.lineWidth=2.5; ctx.lineCap='round';
      [[-12,-12],[12,-12]].forEach(([ex,ey])=>{
        ctx.beginPath();
        ctx.moveTo(ex-7,ey-1);
        ctx.quadraticCurveTo(ex,ey-4,ex+7,ey+1);
        ctx.stroke();
      });

      // Eyes
      const eyeH = 5*(1-s.eyeBlink);
      [[-12,-4],[12,-4]].forEach(([ex,ey])=>{
        // White
        ctx.fillStyle='#f0e8e0';
        ctx.beginPath(); ctx.ellipse(ex,ey,7,eyeH,0,0,Math.PI*2); ctx.fill();
        // Iris (dark brown)
        ctx.fillStyle='#3d2410';
        ctx.beginPath(); ctx.ellipse(ex,ey,4.5,Math.max(1,eyeH*0.85),0,0,Math.PI*2); ctx.fill();
        // Pupil
        ctx.fillStyle='#0a0a0a';
        ctx.beginPath(); ctx.ellipse(ex,ey,2.5,Math.max(0.5,eyeH*0.55),0,0,Math.PI*2); ctx.fill();
        // Catchlight
        ctx.fillStyle='rgba(255,255,255,0.7)';
        ctx.beginPath(); ctx.arc(ex+2,ey-1.5,1.2,0,Math.PI*2); ctx.fill();
      });

      // Nose
      ctx.strokeStyle='rgba(0,0,0,0.25)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(0,-2); ctx.quadraticCurveTo(-4,8,0,10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-2); ctx.quadraticCurveTo(4,8,0,10); ctx.stroke();
      // Nostrils
      ctx.fillStyle='rgba(0,0,0,0.2)';
      ctx.beginPath(); ctx.ellipse(-4,10,3,2,Math.PI*0.2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(4,10,3,2,-Math.PI*0.2,0,Math.PI*2); ctx.fill();

      // Mouth
      ctx.fillStyle='#7a3a28';
      ctx.beginPath();
      ctx.ellipse(0,18,9,3+s.mouthOpen,0,0,Math.PI);
      ctx.fill();
      // Upper lip line
      ctx.strokeStyle='#5a2818'; ctx.lineWidth=1.5;
      ctx.beginPath();
      ctx.moveTo(-9,16); ctx.quadraticCurveTo(-4,14,0,15);
      ctx.quadraticCurveTo(4,14,9,16);
      ctx.stroke();

      // Headphones
      // Ear cups
      ctx.fillStyle='#222235';
      ctx.beginPath(); ctx.ellipse(-30,0,10,14,Math.PI*0.1,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(30,0,10,14,-Math.PI*0.1,0,Math.PI*2); ctx.fill();
      // Arc
      ctx.strokeStyle='#2a2a3f'; ctx.lineWidth=7; ctx.lineCap='round';
      ctx.beginPath(); ctx.arc(0,-8,32,-Math.PI*0.8,-Math.PI*0.2); ctx.stroke();
      // Headphone accent
      ctx.strokeStyle=`rgba(255,107,26,0.9)`; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(0,-8,32,-Math.PI*0.8,-Math.PI*0.2); ctx.stroke();
      // Ear cup accent rings
      ctx.strokeStyle='rgba(255,107,26,0.7)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.ellipse(-30,0,7,10,Math.PI*0.1,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(30,0,7,10,-Math.PI*0.1,0,Math.PI*2); ctx.stroke();

      ctx.restore(); // head

      // --- Shirt logo ---
      ctx.fillStyle='rgba(255,107,26,0.4)';
      ctx.font='bold 8px sans-serif';
      ctx.textAlign='center';
      ctx.fillText('IH', 0, 65);

      ctx.restore(); // full DJ

      // ── TWO TURNTABLE DECKS ─────────────────────────────────────────────
      [[w*0.26, h*0.68],[w*0.74, h*0.68]].forEach(([dx,dy],di)=>{
        const r = Math.min(w,h)*0.115;
        const spin = s.knobSpin * (di===0 ? 1 : -1);

        // Platter base
        ctx.fillStyle='#0c1220'; ctx.strokeStyle='rgba(255,107,26,0.25)'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(dx,dy,r+8,0,Math.PI*2);
        ctx.fill(); ctx.stroke();

        // Vinyl record
        ctx.save(); ctx.translate(dx,dy); ctx.rotate(spin);
        // Record surface
        const recGrad = ctx.createRadialGradient(0,0,0,0,0,r);
        recGrad.addColorStop(0,'#1a1a2e');
        recGrad.addColorStop(0.5,'#111126');
        recGrad.addColorStop(1,'#0d0d1a');
        ctx.fillStyle=recGrad; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill();
        // Grooves
        for(let gi=2;gi<9;gi++){
          ctx.strokeStyle=`rgba(255,107,26,${0.04+gi*0.015})`; ctx.lineWidth=0.7;
          ctx.beginPath(); ctx.arc(0,0,r*(gi/9),0,Math.PI*2); ctx.stroke();
        }
        // Shine arc
        ctx.strokeStyle='rgba(255,255,255,0.05)'; ctx.lineWidth=8;
        ctx.beginPath(); ctx.arc(0,0,r*0.8,-0.8,0.2); ctx.stroke();
        // Label
        const lblGrad = ctx.createRadialGradient(0,0,0,0,0,r*0.24);
        lblGrad.addColorStop(0,'#FF6B1A'); lblGrad.addColorStop(1,'#cc4400');
        ctx.fillStyle=lblGrad; ctx.beginPath(); ctx.arc(0,0,r*0.24,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font=`bold ${r*0.1}px sans-serif`;
        ctx.textAlign='center'; ctx.fillText('IH',0,r*0.06);
        ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font=`${r*0.07}px sans-serif`;
        ctx.fillText('DEEP',0,r*0.16);
        // Spindle
        ctx.fillStyle='#888'; ctx.beginPath(); ctx.arc(0,0,r*0.03,0,Math.PI*2); ctx.fill();
        ctx.restore();

        // Tonearm
        ctx.save(); ctx.translate(dx+r*0.88,dy-r*0.88);
        ctx.rotate(playing ? 0.48 : 0.08);
        // Arm base pivot
        ctx.fillStyle='#555'; ctx.beginPath(); ctx.arc(0,0,5,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=`rgb(255,107,26)`; ctx.beginPath(); ctx.arc(0,0,3,0,Math.PI*2); ctx.fill();
        // Arm
        ctx.strokeStyle='rgba(180,180,200,0.8)'; ctx.lineWidth=3.5; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-r*0.88,r*0.88); ctx.stroke();
        // Headshell
        ctx.fillStyle='#333'; ctx.strokeStyle='#555'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.roundRect(-r*0.88-8,r*0.88-5,18,10,3);
        ctx.fill(); ctx.stroke();
        // Needle
        ctx.strokeStyle='rgba(255,107,26,0.9)'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(-r*0.88,r*0.88+5); ctx.lineTo(-r*0.88,r*0.88+14); ctx.stroke();
        ctx.fillStyle='rgba(255,107,26,0.9)';
        ctx.beginPath(); ctx.arc(-r*0.88,r*0.88+14,2.5,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });

      // ── MIXER UNIT ───────────────────────────────────────────────────────
      const mx=w*0.5, my=h*0.69;
      const mw=w*0.2, mh=h*0.12;
      // Body
      ctx.fillStyle='#0e1a2c'; ctx.strokeStyle='rgba(255,107,26,0.35)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.roundRect(mx-mw/2,my,mw,mh,10); ctx.fill(); ctx.stroke();
      // Screen
      ctx.fillStyle='#061018'; ctx.strokeStyle='rgba(0,191,255,0.3)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.roundRect(mx-mw*0.28,my+mh*0.08,mw*0.56,mh*0.32,4); ctx.fill(); ctx.stroke();
      // Screen content (waveform)
      if(vizVals?.length){
        ctx.strokeStyle='rgba(0,191,255,0.8)'; ctx.lineWidth=1.2;
        ctx.beginPath();
        vizVals.slice(10,42).forEach((v,i)=>{
          const sx=mx-mw*0.26+i*(mw*0.52/32);
          const sy2=my+mh*0.08+mh*0.32/2 - (v/100)*(mh*0.14);
          i===0 ? ctx.moveTo(sx,sy2) : ctx.lineTo(sx,sy2);
        });
        ctx.stroke();
      }
      // Knobs row
      [0.2,0.4,0.6,0.8].forEach((xf,i)=>{
        const kx=mx-mw/2+mw*xf, ky=my+mh*0.58, kr=mh*0.14;
        const krot=s.knobSpin*0.3+i*0.9;
        ctx.fillStyle='#1a2840'; ctx.strokeStyle='rgba(255,107,26,0.5)'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.arc(kx,ky,kr,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle='#0e1a2c'; ctx.beginPath(); ctx.arc(kx,ky,kr*0.55,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle='rgba(255,107,26,0.9)'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(kx,ky); ctx.lineTo(kx+Math.cos(krot)*kr*0.75,ky+Math.sin(krot)*kr*0.75); ctx.stroke();
      });
      // Fader
      const faderX=mx, faderY=my+mh*0.75, faderW=mw*0.5, faderH=5;
      ctx.fillStyle='#1a2840'; ctx.beginPath(); ctx.roundRect(faderX-faderW/2,faderY,faderW,faderH,3); ctx.fill();
      const fPos=faderX-faderW/2+faderW*0.5;
      ctx.fillStyle='rgba(255,107,26,0.9)'; ctx.beginPath(); ctx.roundRect(fPos-8,faderY-4,16,13,3); ctx.fill();

      // VU bars
      if(vizVals?.length){
        const vux=mx+mw*0.3, vuy=my+mh*0.45, vuH2=mh*0.45;
        for(let i=0;i<6;i++){
          const v=vizVals[Math.floor(i*52/6)]/100;
          const bh=vuH2*v;
          ctx.fillStyle=v>0.8?'#FF3B5C':v>0.55?'#FF6B1A':'#00D98A';
          ctx.fillRect(vux+i*5, vuy+vuH2-bh, 3.5, bh);
        }
      }

      // ── CROWD ────────────────────────────────────────────────────────────
      s.crowd.forEach(p=>{
        const bob=Math.sin(s.t*p.speed+p.phase)*(playing?0.014:0.003);
        const px=w*p.x, py=h*(p.baseY+bob), ph2=h*p.h;
        const skin=`rgba(${Math.round(100+p.skin*80)},${Math.round(60+p.skin*40)},${Math.round(30+p.skin*20)},0.75)`;
        // Body silhouette
        ctx.fillStyle='rgba(8,14,24,0.88)';
        ctx.beginPath(); ctx.ellipse(px,py+ph2*0.35,ph2*0.16,ph2*0.5,0,0,Math.PI*2); ctx.fill();
        // Head (with skin tone hint)
        ctx.fillStyle=skin;
        ctx.beginPath(); ctx.arc(px,py-ph2*0.08,ph2*0.14,0,Math.PI*2); ctx.fill();
        // Raised hands (some)
        if(Math.sin(p.phase+s.t*0.3)>0.2 && playing){
          ctx.strokeStyle='rgba(8,14,24,0.75)'; ctx.lineWidth=ph2*0.07; ctx.lineCap='round';
          const side=Math.sin(p.phase)>0?1:-1;
          ctx.beginPath();
          ctx.moveTo(px,py+ph2*0.1);
          ctx.lineTo(px+side*ph2*0.35,py-ph2*0.2+Math.sin(s.t*p.speed*2)*ph2*0.06);
          ctx.stroke();
        }
      });

      // ── SMOKE PARTICLES ──────────────────────────────────────────────────
      s.particles.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy*(playing?1:0.15); p.alpha-=0.0007;
        if(p.y<0||p.alpha<0){p.x=Math.random();p.y=0.75+Math.random()*0.15;p.alpha=0.15+Math.random()*0.2;p.vy=-Math.random()*0.0005-0.0001;}
        ctx.fillStyle=`rgba(180,140,100,${p.alpha})`;
        ctx.beginPath(); ctx.arc(p.x*w,p.y*h,p.size,0,Math.PI*2); ctx.fill();
      });

      // ── VIGNETTE ─────────────────────────────────────────────────────────
      const vig=ctx.createRadialGradient(w/2,h*0.45,h*0.1,w/2,h*0.45,h*0.75);
      vig.addColorStop(0,'transparent'); vig.addColorStop(1,'rgba(1,3,6,0.78)');
      ctx.fillStyle=vig; ctx.fillRect(0,0,w,h);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize',resize); };
  }, [playing]);

  return (
    <div style={{position:"absolute",inset:0,zIndex:1}}>
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
      <div style={{position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
        background:`radial-gradient(ellipse at 50% 30%, rgba(255,107,26,${beat?0.14:0}) 0%, transparent 55%)`,
        transition:"background 0.09s"}}/>
    </div>
  );
}

// ─── LIVE SESSION ─────────────────────────────────────────────────────────────
function LiveSession({booking, onEnd}) {
  const [phase,       setPhase]       = useState("waiting");
  const [elapsed,     setElapsed]     = useState(0);
  const [vol,         setVol]         = useState(75);
  const [requests,    setRequests]    = useState([]);
  const [reqInput,    setReqInput]    = useState("");
  const [trackIdx,    setTrackIdx]    = useState(0);
  const [trackElapsed,setTrackElapsed]= useState(0);
  const [showPanel,   setShowPanel]   = useState(true);
  const [hostCamOn,   setHostCamOn]   = useState(false);
  const [beat,        setBeat]        = useState(false);
  const [vizVals,     setVizVals]     = useState(()=>Array.from({length:52},()=>Math.random()*30+5));
  const [hostStream,  setHostStream]  = useState(null);
  const [camErr,      setCamErr]      = useState(null);
  const [audioOn,     setAudioOn]     = useState(false);
  const [eq,          setEq]          = useState({bass:80, mid:60, treble:70});
  const [xfader,      setXfader]      = useState(50);

  const sessionRef = useRef(null);
  const trackRef   = useRef(null);
  const beatRef    = useRef(null);
  const vizRef     = useRef(null);
  const hostVidRef = useRef(null);

  const TRACKS = [
    {title:"Warm Entry",    bpm:124, key:"Am", genre:"Deep House"},
    {title:"Sub Pressure",  bpm:124, key:"Dm", genre:"Deep House"},
    {title:"Midnight Cord", bpm:124, key:"Fm", genre:"Deep House"},
    {title:"Layer One",     bpm:126, key:"Gm", genre:"Afro House"},
    {title:"Bassline Love", bpm:122, key:"Am", genre:"Deep House"},
    {title:"The Drop",      bpm:126, key:"Cm", genre:"Tech House"},
    {title:"Slow Descent",  bpm:120, key:"Dm", genre:"Deep House"},
    {title:"Final Mix",     bpm:124, key:"Am", genre:"Deep House"},
  ];
  const track    = TRACKS[trackIdx];
  const totalSec = booking.duration ? Math.round(parseFloat(booking.duration)*3600) : 7200;
  const fmt  = s=>`${Math.floor(s/3600).toString().padStart(2,"0")}:${Math.floor((s%3600)/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  const fmtM = s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const pct  = (elapsed / totalSec) * 100;
  const tpct = (trackElapsed / 240) * 100;

  // ── Audio engine ──────────────────────────────────────────────────────────
  useDeepHouseEngine(audioOn && phase === "live", vol);

  const startSession = () => {
    setPhase("live");
    setAudioOn(true);
    sessionRef.current = setInterval(() => setElapsed(e => {
      if (e >= totalSec - 1) {
        setPhase("ended"); setAudioOn(false);
        [sessionRef, trackRef, beatRef, vizRef].forEach(r => clearInterval(r.current));
        return e;
      }
      return e + 1;
    }), 1000);
    let te = 0;
    trackRef.current = setInterval(() => {
      te++;
      setTrackElapsed(te);
      if (te >= 240) { te = 0; setTrackIdx(i => (i+1) % TRACKS.length); }
    }, 1000);
  };

  useEffect(() => {
    if (phase !== "live") return;
    const bpm = track.bpm;
    clearInterval(beatRef.current);
    clearInterval(vizRef.current);
    beatRef.current = setInterval(() => { setBeat(true); setTimeout(() => setBeat(false), 85); }, Math.round(60000/bpm));
    vizRef.current  = setInterval(() => setVizVals(Array.from({length:52}, (_,i) => {
      const c = 1 - Math.abs(i-26)/26;
      return c*(Math.random()*80+15) + Math.random()*10+3;
    })), Math.max(50, 155 - bpm));
    return () => { clearInterval(beatRef.current); clearInterval(vizRef.current); };
  }, [phase, trackIdx]);

  useEffect(() => () => {
    [sessionRef, trackRef, beatRef, vizRef].forEach(r => clearInterval(r.current));
    hostStream?.getTracks().forEach(t => t.stop());
    setAudioOn(false);
  }, []);

  const toggleHostCam = async () => {
    if (hostCamOn) {
      hostStream?.getTracks().forEach(t => t.stop());
      setHostStream(null); setHostCamOn(false); return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
      setHostStream(stream); setHostCamOn(true); setCamErr(null);
      setTimeout(() => { if (hostVidRef.current) hostVidRef.current.srcObject = stream; }, 100);
    } catch(e) { setCamErr("Camera access denied."); }
  };

  const addReq = () => {
    if (!reqInput.trim()) return;
    setRequests(r => [...r, {id:genId(), song:reqInput.trim(), sent:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]);
    setReqInput("");
  };

  // ── ENDED ─────────────────────────────────────────────────────────────────
  if (phase === "ended") return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:500,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:16}}>🎶</div>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:32,color:C.primary,letterSpacing:-1,marginBottom:12,textTransform:"uppercase"}}>Session Complete!</div>
        <div style={{color:C.sub,fontSize:14,lineHeight:1.8,marginBottom:24}}>
          Your {booking.duration} private session with <strong style={{color:C.primary}}>{booking.dj.name}</strong> has ended. Hope the party was 🔥
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22,marginBottom:22,textAlign:"left"}}>
          {[["DJ",booking.dj.name],["Event",booking.eventType],["Duration",booking.duration],["Song Requests",requests.length]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <span style={{color:C.sub}}>{k}</span><span style={{fontWeight:700}}>{v}</span>
            </div>
          ))}
        </div>
        <Btn onClick={onEnd} full>← Back to My Sessions</Btn>
      </div>
    </div>
  );

  // ── WAITING ───────────────────────────────────────────────────────────────
  if (phase === "waiting") return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{maxWidth:560,width:"100%"}}>
        {/* Offline DJ preview */}
        <div style={{position:"relative",borderRadius:16,overflow:"hidden",aspectRatio:"16/9",marginBottom:20,background:"#07101F",border:`2px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:64,marginBottom:10}}>{booking.dj.avatar}</div>
            <div style={{fontWeight:800,fontSize:18,marginBottom:4}}>{booking.dj.name}</div>
            <div style={{fontSize:12,color:C.sub,marginBottom:12}}>📡 Standing by in studio…</div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,0,0,0.5)",border:`1px solid ${C.border}`,borderRadius:20,padding:"5px 14px"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:C.sub}}/>
              <span style={{fontSize:11,color:C.sub,letterSpacing:2}}>OFFLINE</span>
            </div>
          </div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.primaryBorder}`,borderRadius:16,padding:28}}>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:32,marginBottom:8}}>⏳</div>
            <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:20,color:C.primary,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Session Ready</div>
            <div style={{color:C.sub,fontSize:13,lineHeight:1.8}}>
              <strong style={{color:C.text}}>{booking.dj.name}</strong> is standing by in their studio.<br/>
              <strong style={{color:C.primary}}>{booking.startTime}</strong> · {booking.duration}
            </div>
          </div>
          <div style={{display:"flex",gap:10,background:"#0A1322",border:`1px solid ${C.border}`,borderRadius:10,padding:16,marginBottom:20}}>
            {[["📶","Bluetooth","Any BT speaker"],["🔌","AUX","Soundbar/receiver"],["📺","Chromecast","Cast to TV"]].map(([ic,t,d])=>(
              <div key={t} style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:20,marginBottom:4}}>{ic}</div>
                <div style={{fontSize:11,fontWeight:800,marginBottom:2}}>{t}</div>
                <div style={{fontSize:10,color:C.sub}}>{d}</div>
              </div>
            ))}
          </div>
          <Btn onClick={startSession} full variant="green" sx={{padding:"15px",fontSize:15}}>▶ Start Streaming Now</Btn>
        </div>
      </div>
    </div>
  );

  // ── LIVE — FULLSCREEN DEEP HOUSE DJ VIEW ──────────────────────────────────
  return (
    <div style={{position:"fixed",inset:0,background:"#030810",color:C.text,overflow:"hidden",fontFamily:"inherit"}}>

      {/* ── Ambient background ── */}
      <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",top:"-15%",left:"50%",transform:"translateX(-50%)",width:"90%",height:"70%",
          background:`radial-gradient(ellipse, ${C.primary}${beat?"12":"07"} 0%, transparent 65%)`,transition:"background 0.1s"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"50%",
          background:`radial-gradient(ellipse at 50% 100%, ${C.accent}${beat?"0a":"05"} 0%, transparent 70%)`,transition:"background 0.15s"}}/>
        <div style={{position:"absolute",inset:0,
          backgroundImage:`radial-gradient(${C.primary}05 1px, transparent 1px)`,
          backgroundSize:"30px 30px"}}/>
      </div>

      {/* ── ANIMATED DJ VIDEO BACKGROUND (Canvas-based, no external deps) ── */}
      <DJVideoBackground beat={beat} playing={audioOn} bpm={track.bpm} vizVals={vizVals}/>


      {/* ── DJ STAGE — CENTER (mixer sits bottom-center, turntable floats bottom-left) ── */}
      <div style={{position:"absolute",inset:0,zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",paddingBottom:95}}>

        {/* Spinning turntable — bottom left, semi-transparent */}
        <div style={{position:"absolute",bottom:98,left:20,opacity:0.85,zIndex:3,
          transform:`scale(${beat?1.012:1})`,transition:"transform 0.08s"}}>
          <Turntable playing={audioOn} bpm={track.bpm} size={155}/>
        </div>

        {/* DJ Mixer console */}
        <div style={{
          background:"linear-gradient(to bottom, #0c1628, #080f1e)",
          border:`1px solid ${C.border}`,
          borderRadius:14,
          padding:"16px 24px",
          display:"flex",gap:20,alignItems:"center",
          boxShadow:`0 0 30px ${C.primary}18`,
          position:"relative",zIndex:2,
          width:"min(480px,90vw)",
        }}>
          {/* EQ Knobs */}
          {[["BASS",eq.bass,"bass"],["MID",eq.mid,"mid"],["TREBLE",eq.treble,"treble"]].map(([label,val,key])=>(
            <div key={key} style={{flex:1,textAlign:"center"}}>
              <div style={{position:"relative",width:44,height:44,margin:"0 auto 6px"}}>
                <svg viewBox="0 0 44 44" width="44" height="44">
                  <circle cx="22" cy="22" r="18" fill="#0a1020" stroke={C.border} strokeWidth="1.5"/>
                  <circle cx="22" cy="22" r="18" fill="none" stroke={C.primary}
                    strokeWidth="3" strokeDasharray={`${val * 1.13} 113`}
                    strokeDashoffset="28" strokeLinecap="round" opacity="0.8"/>
                  <circle cx="22" cy="22" r="7" fill="#111d33"/>
                  <circle cx="22" cy="22" r="3" fill={C.primary} opacity="0.9"/>
                </svg>
              </div>
              <input type="range" min={0} max={100} value={val}
                onChange={e=>setEq(q=>({...q,[key]:+e.target.value}))}
                style={{width:"100%",accentColor:C.primary,height:3}}/>
              <div style={{fontSize:9,color:C.sub,letterSpacing:2,marginTop:4,textTransform:"uppercase"}}>{label}</div>
            </div>
          ))}

          {/* VU meter */}
          <div style={{display:"flex",gap:3,alignItems:"flex-end",height:50,padding:"0 4px"}}>
            {vizVals.slice(20,32).map((v,i)=>(
              <div key={i} style={{width:4,height:`${v}%`,
                background:v>75?C.red:v>50?C.primary:C.green,
                borderRadius:"1px 1px 0 0",transition:"height 0.09s ease"}}/>
            ))}
          </div>

          {/* Crossfader */}
          <div style={{flex:2,textAlign:"center"}}>
            <div style={{fontSize:9,color:C.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Crossfader</div>
            <input type="range" min={0} max={100} value={xfader}
              onChange={e=>setXfader(+e.target.value)}
              style={{width:"100%",accentColor:C.primary}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.sub,marginTop:3}}>
              <span>A</span><span>B</span>
            </div>
          </div>

          {/* Channel faders */}
          {["CH1","CH2"].map((ch,i)=>(
            <div key={ch} style={{textAlign:"center"}}>
              <div style={{position:"relative",height:60,width:16,margin:"0 auto 4px",background:"#0a1020",borderRadius:8,border:`1px solid ${C.border}`}}>
                <div style={{position:"absolute",bottom:i===0?`${60*(1-xfader/100)*0.6}%`:`${60*(xfader/100)*0.6}%`,
                  left:0,right:0,height:8,background:C.primary,borderRadius:4,
                  boxShadow:`0 0 6px ${C.primary}`,transition:"bottom 0.05s"}}/>
              </div>
              <div style={{fontSize:8,color:C.sub,letterSpacing:1,textTransform:"uppercase"}}>{ch}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VISUALIZER — bottom full width ── */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:90,zIndex:3,pointerEvents:"none",
        background:"linear-gradient(to top, #00000099, transparent)"}}>
        <div style={{position:"absolute",bottom:0,left:0,right:0,display:"flex",gap:2,alignItems:"flex-end",padding:"0 6px",height:84}}>
          {vizVals.map((v,i)=>{
            const c=1-Math.abs(i-26)/26;
            const r=Math.round(200+c*55), g=Math.round(90*c), b=Math.round(20*(1-c)+80*c);
            return <div key={i} style={{flex:1,height:`${v}%`,background:`rgb(${r},${g},${b})`,
              borderRadius:"2px 2px 0 0",transition:"height 0.09s ease",minWidth:3}}/>;
          })}
        </div>
      </div>

      {/* ── SESSION PROGRESS BAR ── */}
      <div style={{position:"absolute",bottom:84,left:0,right:0,zIndex:4,padding:"0 16px"}}>
        <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,
            background:`linear-gradient(90deg,${C.primary},${C.green})`,
            borderRadius:2,transition:"width 1s linear"}}/>
        </div>
      </div>

      {/* ── TOP HUD ── */}
      <div style={{position:"absolute",top:0,left:0,right:0,zIndex:10,padding:"14px 18px",
        display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",
        background:"linear-gradient(to bottom,rgba(3,8,16,0.9),transparent)"}}>

        {/* LIVE badge */}
        <div style={{display:"flex",alignItems:"center",gap:7,
          background:"rgba(255,59,92,0.2)",border:"1px solid rgba(255,59,92,0.5)",
          borderRadius:8,padding:"5px 12px",backdropFilter:"blur(6px)"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:C.red,
            boxShadow:`0 0 8px ${C.red}`,animation:"pulse 1s infinite"}}/>
          <span style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:13,color:C.red,letterSpacing:3}}>LIVE</span>
        </div>

        {/* Track pill */}
        <div style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",
          borderRadius:8,padding:"6px 14px",border:`1px solid ${C.border}`}}>
          <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{track.title}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",letterSpacing:1}}>
            {track.bpm} BPM · Key {track.key} · {track.genre}
          </div>
        </div>

        {/* Audio toggle */}
        <button onClick={()=>setAudioOn(a=>!a)} style={{
          background:audioOn?`${C.primary}22`:"rgba(255,255,255,0.05)",
          border:`1px solid ${audioOn?C.primary:C.border}`,
          borderRadius:8,padding:"6px 14px",cursor:"pointer",
          color:audioOn?C.primary:C.sub,fontSize:12,fontWeight:800,
          fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase",backdropFilter:"blur(6px)"}}>
          {audioOn?"🔊 Audio On":"🔇 Audio Off"}
        </button>

        {/* Timer */}
        <div style={{marginLeft:"auto",background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",
          borderRadius:8,padding:"6px 14px",border:`1px solid ${C.border}`,textAlign:"right"}}>
          <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:20,color:C.primary,letterSpacing:2}}>{fmt(elapsed)}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:1}}>{fmt(totalSec-elapsed)} remaining</div>
        </div>
      </div>

      {/* ── NOW PLAYING pill — centered ── */}
      <div style={{position:"absolute",top:66,left:"50%",transform:"translateX(-50%)",zIndex:10,whiteSpace:"nowrap"}}>
        <div style={{background:"rgba(0,0,0,0.7)",backdropFilter:"blur(14px)",
          border:`1px solid ${C.primary}44`,borderRadius:24,padding:"6px 18px",
          display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.primary,
            boxShadow:`0 0 6px ${C.primary}`,animation:"pulse 1s infinite"}}/>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Now Playing</span>
          <div style={{height:10,width:1,background:"rgba(255,255,255,0.15)"}}/>
          <span style={{fontSize:12,fontWeight:800,color:"#fff"}}>{track.title}</span>
          <div style={{width:60,height:3,background:"rgba(255,255,255,0.12)",borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${tpct}%`,background:C.primary,borderRadius:2,transition:"width 1s linear"}}/>
          </div>
          <span style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{fmtM(trackElapsed)} / 4:00</span>
        </div>
      </div>

      {/* ── HOST CAM PiP ── */}
      {hostCamOn && (
        <div style={{position:"absolute",bottom:100,left:16,zIndex:20,width:150,
          aspectRatio:"4/3",borderRadius:12,overflow:"hidden",
          border:`2px solid ${C.primary}`,boxShadow:`0 0 20px ${C.primary}44`}}>
          <video ref={hostVidRef} autoPlay muted playsInline
            style={{width:"100%",height:"100%",objectFit:"cover",transform:"scaleX(-1)"}}/>
          <div style={{position:"absolute",top:5,left:7,fontSize:9,color:"#fff",fontWeight:800,
            letterSpacing:1,background:"rgba(0,0,0,0.6)",borderRadius:4,padding:"2px 6px"}}>YOU</div>
        </div>
      )}

      {/* ── SLIDE-IN PANEL ── */}
      <div style={{position:"absolute",top:0,right:0,bottom:0,zIndex:15,display:"flex"}}>
        <div onClick={()=>setShowPanel(p=>!p)} style={{
          alignSelf:"center",background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",
          border:`1px solid ${C.border}`,borderRight:"none",borderRadius:"10px 0 0 10px",
          padding:"14px 8px",cursor:"pointer",writingMode:"vertical-rl",
          fontSize:11,fontWeight:800,color:C.primary,letterSpacing:2,
          textTransform:"uppercase",userSelect:"none"}}>
          {showPanel ? "Hide ▶" : "◀ Controls"}
        </div>

        <div style={{width:showPanel?290:0,transition:"width 0.3s ease",overflow:"hidden",
          background:"rgba(5,10,22,0.94)",backdropFilter:"blur(18px)",
          borderLeft:`1px solid ${C.border}`,display:"flex",flexDirection:"column"}}>
          <div style={{width:290,height:"100%",display:"flex",flexDirection:"column",overflowY:"auto"}}>

            {/* Cameras */}
            <div style={{padding:"18px 16px 14px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase",marginBottom:10}}>Cameras</div>
              <div style={{display:"flex",gap:8}}>
                <button style={{flex:1,background:`${C.primary}18`,border:`1px solid ${C.primary}44`,borderRadius:8,
                  padding:"10px 8px",cursor:"default",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:3}}>🎬</div>
                  <div style={{fontSize:10,fontWeight:800,color:C.primary,textTransform:"uppercase",letterSpacing:1}}>DJ Cam</div>
                  <div style={{fontSize:9,color:C.sub,marginTop:2}}>Live</div>
                </button>
                <button onClick={toggleHostCam} style={{flex:1,
                  background:hostCamOn?`${C.accent}18`:"rgba(255,255,255,0.04)",
                  border:`1px solid ${hostCamOn?C.accent:C.border}`,
                  borderRadius:8,padding:"10px 8px",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                  <div style={{fontSize:18,marginBottom:3}}>📱</div>
                  <div style={{fontSize:10,fontWeight:800,color:hostCamOn?C.accent:C.sub,
                    textTransform:"uppercase",letterSpacing:1}}>Your Cam</div>
                  <div style={{fontSize:9,color:C.sub,marginTop:2}}>{hostCamOn?"On":"Off"}</div>
                </button>
              </div>
              {camErr && <div style={{marginTop:8,fontSize:11,color:C.red,lineHeight:1.5}}>{camErr}</div>}
            </div>

            {/* Volume */}
            <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,
                color:C.sub,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>
                <span>🔊 Volume</span><span style={{color:C.primary}}>{vol}%</span>
              </div>
              <input type="range" min={0} max={100} value={vol}
                onChange={e=>setVol(+e.target.value)} style={{width:"100%",accentColor:C.primary}}/>
            </div>

            {/* Tracklist */}
            <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase",marginBottom:10}}>Set Order</div>
              {TRACKS.map((t,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"6px 0",opacity:i<trackIdx?0.25:i===trackIdx?1:0.55}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {i===trackIdx
                      ?<div style={{width:6,height:6,borderRadius:"50%",background:C.primary,animation:"pulse 1s infinite",flexShrink:0}}/>
                      :<div style={{width:6,height:6,borderRadius:"50%",background:i<trackIdx?C.green:C.muted,flexShrink:0}}/>}
                    <span style={{fontSize:12,fontWeight:i===trackIdx?800:400,
                      color:i===trackIdx?C.primary:i<trackIdx?C.sub:C.text}}>{t.title}</span>
                  </div>
                  <span style={{fontSize:10,color:C.sub}}>{t.bpm}</span>
                </div>
              ))}
            </div>

            {/* Song requests */}
            <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
              <div style={{padding:"14px 16px 8px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase"}}>Requests</div>
                {requests.length>0 && <Badge color={C.primary}>{requests.length}</Badge>}
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
                {requests.length===0
                  ? <div style={{padding:"20px 0",color:C.sub,fontSize:12,textAlign:"center",lineHeight:1.7}}>No requests yet.<br/>Send one below.</div>
                  : requests.map(r=>(
                    <div key={r.id} style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                      <div style={{fontSize:13,fontWeight:700}}>{r.song}</div>
                      <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                        <span style={{fontSize:10,color:C.green}}>✓ Sent to DJ</span>
                        <span style={{fontSize:10,color:C.sub}}>{r.sent}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`}}>
                <div style={{display:"flex",gap:7}}>
                  <input value={reqInput} onChange={e=>setReqInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&addReq()}
                    placeholder="Request a song…"
                    style={{flex:1,background:"rgba(255,255,255,0.05)",border:`1px solid ${C.border}`,
                      borderRadius:6,padding:"9px 11px",color:C.text,fontFamily:"inherit",fontSize:13,outline:"none"}}/>
                  <Btn onClick={addReq} sm>Send</Btn>
                </div>
                <div style={{fontSize:10,color:C.sub,marginTop:7,textAlign:"center"}}>DJ sees these live</div>
              </div>
            </div>

            <div style={{padding:"14px 16px",borderTop:`1px solid ${C.border}`}}>
              <Btn onClick={onEnd} variant="ghost" full sm>✕ End Session</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Beat flash */}
      {beat && <div style={{position:"absolute",inset:0,background:`${C.primary}04`,pointerEvents:"none",zIndex:1}}/>}
    </div>
  );
}
// ─── USER DASHBOARD ───────────────────────────────────────────────────────────
function UserDashboard({user,bookings,onJoinSession,onReview}) {
  const now=new Date();
  const upcoming=bookings.filter(b=>new Date(b.date)>=now);
  const past=bookings.filter(b=>new Date(b.date)<now);
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:32}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Impact','Arial Black',sans-serif",fontSize:24,color:"#000"}}>{user.name[0]}</div>
        <div><div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:20}}>{user.name}</div><div style={{fontSize:12,color:C.sub}}>{user.email}</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:28}}>
        {[["Sessions",bookings.length],["Upcoming",upcoming.length],["Spent",`$${bookings.reduce((s,b)=>s+(b.fee||0),0)}`]].map(([l,v])=>(
          <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,textAlign:"center"}}>
            <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:26,color:C.yellow}}>{v}</div>
            <div style={{fontSize:10,color:C.sub,letterSpacing:2,marginTop:3,textTransform:"uppercase"}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Setup tip */}
      <div style={{background:C.greenDim,border:`1px solid ${C.green}30`,borderRadius:10,padding:16,marginBottom:22,display:"flex",gap:12,alignItems:"flex-start"}}>
        <div style={{fontSize:20,flexShrink:0}}>🔊</div>
        <div><div style={{fontWeight:800,fontSize:13,color:C.green,marginBottom:4}}>Speaker Setup Reminder</div><div style={{fontSize:12,color:C.sub,lineHeight:1.7}}>At your session time, open Indahouse and tap <strong>Start Streaming</strong>. Keep your phone connected to your Bluetooth speaker or plug into AUX. The DJ streams live audio directly — just turn up the volume and enjoy.</div></div>
      </div>

      <div style={{fontSize:11,letterSpacing:4,color:C.sub,textTransform:"uppercase",marginBottom:12}}>My Sessions</div>
      {bookings.length===0
        ?<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:40,textAlign:"center",color:C.sub}}>No sessions yet. <span style={{color:C.yellow,cursor:"pointer"}} onClick={()=>{}}>Browse DJs →</span></div>
        :bookings.map((b,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:20,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{b.dj.avatar}</div>
                  <div style={{fontWeight:800,fontSize:15}}>{b.dj.name}</div>
                </div>
                <div style={{fontSize:12,color:C.sub}}>{b.eventType} · {b.date} · {b.startTime} · {b.duration}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:18,color:C.yellow}}>${b.fee}</div>
                <Badge color={C.green}>Confirmed</Badge>
              </div>
            </div>
            <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:12,color:C.sub}}>Stream at {b.startTime} on {b.date}</div>
              <div style={{display:"flex",gap:8}}>
                <Btn onClick={()=>onReview(b.dj,b)} variant="ghost" sm>⭐ Review</Btn>
                <Btn onClick={()=>onJoinSession(b)} variant="green" sm>▶ Open Session</Btn>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ─── DJ DASHBOARD ─────────────────────────────────────────────────────────────
function DJDashboard({user,djs}) {
  const myDJ=djs.find(d=>d.name===user.djName)||{reviews:[],reviewCount:0,rating:0,ratingBreakdown:{}};
  const totalEarnings=myDJ.reviewCount*((user.fee||100)*2.5);
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🎧</div>
        <div><div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:20}}>{user.djName}</div><div style={{fontSize:12,color:C.sub}}>{user.email} · Remote DJ</div></div>
      </div>

      {/* How DJ side works */}
      <div style={{background:C.yellowDim,border:`1px solid ${C.yellowBorder}`,borderRadius:10,padding:20,marginBottom:24}}>
        <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:14,color:C.yellow,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>How Remote Sessions Work — Your Side</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
          {[["📅","Get Booked","Hosts find your profile and book a time slot & duration."],["🎙","Go Live","At the agreed time, open Indahouse and start your broadcast from your mixer or mic."],["🎵","Mix Live","Your audio streams privately to the host's session. They hear you live through their speakers."],["💬","See Requests","Song requests come in through the app in real time. Weave them into your set."]].map(([icon,t,d])=>(
            <div key={t}><div style={{fontSize:20,marginBottom:6}}>{icon}</div><div style={{fontSize:12,fontWeight:800,marginBottom:4}}>{t}</div><div style={{fontSize:11,color:C.sub,lineHeight:1.6}}>{d}</div></div>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
        {[["Rating",myDJ.rating?`${myDJ.rating} ★`:"New"],["Sessions",myDJ.reviewCount],["Est. Earned",`$${Math.round(totalEarnings)}`]].map(([l,v])=>(
          <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,textAlign:"center"}}>
            <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:26,color:C.yellow}}>{v}</div>
            <div style={{fontSize:10,color:C.sub,letterSpacing:2,marginTop:3,textTransform:"uppercase"}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:22}}>
        <div style={{fontSize:11,letterSpacing:3,color:C.sub,textTransform:"uppercase",marginBottom:16}}>My Profile</div>
        {[["Stage Name",user.djName],["City",user.city],["Rate",`$${user.fee}/hr`],["Min Hours",`${user.minHours||1} hour(s)`],["Genres",(user.genres||[]).join(", ")],["Events",(user.events||[]).join(", ")],["Bio",user.bio]].map(([k,v])=>v&&(
          <div key={k} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
            <span style={{color:C.sub,minWidth:100}}>{k}</span><span style={{color:"#ccc"}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
function LoginForm({ onSubmit, onSignUp, onDJSignUp, onGoogle, onApple }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("user");
  const [error,    setError]    = useState("");

  const handleSubmit = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    onSubmit({ email, password, role });
  };

  return (
    <div>
      {/* Social login at top */}
      <SocialAuthButtons onGoogle={onGoogle} onApple={onApple} label="log in"/>

      <Input label="Email" type="email" placeholder="you@email.com" required value={email} onChange={setEmail}/>
      <Input label="Password" type="password" placeholder="••••••••" required value={password} onChange={setPassword}/>

      {/* Role toggle */}
      <div style={{marginBottom:18}}>
        <div style={{fontSize:10,letterSpacing:3,color:C.sub,textTransform:"uppercase",marginBottom:8}}>I am a</div>
        <div style={{display:"flex",gap:8}}>
          {[["user","🎉 Party Host"],["dj","🎧 DJ"]].map(([r,label])=>(
            <button key={r} onClick={()=>setRole(r)} style={{
              flex:1, background:role===r?C.primary:"#0a1020",
              color:role===r?"#000":C.sub,
              border:`1px solid ${role===r?C.primary:C.border}`,
              padding:"10px", borderRadius:8, cursor:"pointer",
              fontSize:12, fontWeight:800, fontFamily:"inherit",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {error && <div style={{color:C.red,fontSize:12,marginBottom:12}}>{error}</div>}

      <Btn onClick={handleSubmit} full sx={{marginBottom:14}}>Log In →</Btn>

      <div style={{textAlign:"center",fontSize:13,color:C.sub}}>
        Don't have an account?{" "}
        <span onClick={onSignUp} style={{color:C.primary,cursor:"pointer",fontWeight:700}}>Sign up as host</span>
        {" "}or{" "}
        <span onClick={onDJSignUp} style={{color:C.primary,cursor:"pointer",fontWeight:700}}>join as DJ</span>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("landing");
  const [user,setUser]=useState(null);
  const [role,setRole]=useState(null);
  const [bookings,setBookings]=useState([]);
  const [bookingTarget,setBookingTarget]=useState(null);
  const [djs,setDjs]=useState(SEED_DJS);
  const [reviewOverrides,setReviewOverrides]=useState({});
  const [profileDJ,setProfileDJ]=useState(null);
  const [reviewTarget,setReviewTarget]=useState(null);
  const [activeSession,setActiveSession]=useState(null);

  const nav=p=>{setPage(p);setProfileDJ(null);setActiveSession(null);};

  const handleUserSignup=vals=>{setUser({...vals,name:vals.name||"Guest"});setRole("user");setPage("browse");};
  const handleDJSignup=vals=>{
    const dj={id:genId(),name:vals.djName,avatar:"🎧",city:vals.city,genres:vals.genres||[],fee:parseInt(vals.fee)||100,feeUnit:"hr",rating:0,reviewCount:0,bio:vals.bio||"",events:vals.events||[],available:["2025-06-20","2025-06-27","2025-07-04"],minHours:parseInt(vals.minHours)||1,reviews:[],ratingBreakdown:{5:0,4:0,3:0,2:0,1:0}};
    setDjs(p=>[...p,dj]);
    setUser({...vals,djName:vals.djName});
    setRole("dj");
    setPage("dj-dash");
  };
  const handleBook=dj=>{if(!user){setPage("signup-user");return;}setBookingTarget(dj);};
  const handleConfirm=b=>{setBookings(p=>[...p,{...b,status:"confirmed"}]);};
  const handleSubmitReview=(djId,review)=>{
    setReviewOverrides(prev=>({...prev,[djId]:[review,...(prev[djId]||[])]}));
    setDjs(prev=>prev.map(dj=>{if(dj.id!==djId) return dj;const all=[review,...dj.reviews];const avg=all.reduce((s,r)=>s+r.rating,0)/all.length;const nb={...dj.ratingBreakdown};nb[review.rating]=(nb[review.rating]||0)+1;return {...dj,rating:Math.round(avg*10)/10,reviewCount:dj.reviewCount+1,ratingBreakdown:nb};}));
  };
  const handleHelpful=(djId,reviewId)=>setReviewOverrides(prev=>({...prev,[djId]:(prev[djId]||[]).map(r=>r.id===reviewId?{...r,helpful:r.helpful+1}:r)}));
  const handleLogin = (vals) => {
    if (!vals.email || !vals.password) return;
    const isDJ = vals.role === 'dj';
    setUser({ name: vals.email.split('@')[0], email: vals.email, djName: vals.email.split('@')[0] });
    setRole(isDJ ? 'dj' : 'user');
    setPage(isDJ ? 'dj-dash' : 'browse');
  };

  const handleGoogleAuth = () => {
    // In production: supabase.auth.signInWithOAuth({ provider: 'google' })
    // For demo — simulate Google login
    const mockName = "Google User";
    const mockEmail = "user@gmail.com";
    setUser({ name: mockName, email: mockEmail });
    setRole('user');
    setPage('browse');
  };

  const handleAppleAuth = () => {
    // In production: supabase.auth.signInWithOAuth({ provider: 'apple' })
    // For demo — simulate Apple login
    const mockName = "Apple User";
    const mockEmail = "user@icloud.com";
    setUser({ name: mockName, email: mockEmail });
    setRole('user');
    setPage('browse');
  };

  const currentPage=activeSession?"session":profileDJ?"profile":page;
  const navItems=user
    ?role==="dj"?[["dj-dash","Dashboard"],["browse","Browse"]]:[["browse","Browse DJs"],["user-dash","My Sessions"]]
    :[["browse","Browse DJs"],["login","Log In"],["signup-user","Sign Up"],["signup-dj","DJ Sign Up"]];

  if(currentPage==="session") return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
      <style>{styles}</style>
      <nav style={{position:"sticky",top:0,zIndex:100,background:"#070D1Cf0",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",display:"flex",justifyContent:"space-between",alignItems:"center",height:52}}>
          <Logo sm/>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:C.red,animation:"pulse 1s infinite"}}/>
            <span style={{fontSize:11,color:C.red,fontWeight:800,letterSpacing:2}}>LIVE — PRIVATE SESSION</span>
          </div>
        </div>
      </nav>
      <LiveSession booking={activeSession} onEnd={()=>{setActiveSession(null);setPage("user-dash");}}/>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
      <style>{styles}</style>
      <nav style={{position:"sticky",top:0,zIndex:100,background:"#070D1Cf0",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",display:"flex",justifyContent:"space-between",alignItems:"center",height:52}}>
          <div onClick={()=>nav("landing")} style={{cursor:"pointer"}}><Logo sm/></div>
          <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
            {navItems.map(([p,label])=>(
              <button key={p} onClick={()=>nav(p)} style={{
                background:p==="signup-user"&&!user?C.primary:page===p?C.yellowDim:"transparent",
                color:p==="signup-user"&&!user?"#000":page===p?C.yellow:C.sub,
                border:`1px solid ${p==="signup-user"&&!user?C.primary:page===p?C.yellowBorder:"transparent"}`,
                padding:"5px 12px",borderRadius:6,cursor:"pointer",fontSize:11,
                fontWeight:800,fontFamily:"inherit",textTransform:"uppercase",letterSpacing:1
              }}>{label}</button>
            ))}
            {user&&<button onClick={()=>{setUser(null);setRole(null);nav("landing");}} style={{background:"transparent",color:C.sub,border:`1px solid ${C.border}`,padding:"5px 11px",borderRadius:6,cursor:"pointer",fontSize:11,fontFamily:"inherit",textTransform:"uppercase",letterSpacing:1}}>Log Out</button>}
          </div>
        </div>
      </nav>
      <div style={{animation:"fadeIn 0.3s ease"}} key={currentPage}>
        {currentPage==="landing"&&<Landing onNav={nav}/>}

        {currentPage==="login"&&(
          <div style={{maxWidth:440,margin:"52px auto",padding:"0 20px"}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontFamily:"'Impact','Arial Black',sans-serif",fontSize:26,color:C.primary,textTransform:"uppercase",letterSpacing:-0.5,marginBottom:6}}>Welcome Back</div>
              <div style={{color:C.sub,fontSize:13}}>Log in to your Indahouse account</div>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:28}}>
              <LoginForm onSubmit={handleLogin} onGoogle={handleGoogleAuth} onApple={handleAppleAuth} onSignUp={()=>nav("signup-user")} onDJSignUp={()=>nav("signup-dj")}/>
            </div>
          </div>
        )}

        {currentPage==="signup-user"&&<AuthForm title="Create Account" subtitle="Book remote DJs for your next party or dinner" cta="Create Account →" fields={[{key:"name",label:"Full Name",placeholder:"Your name",required:true},{key:"email",label:"Email",type:"email",placeholder:"you@email.com",required:true},{key:"password",label:"Password",type:"password",placeholder:"••••••••",required:true},{key:"city",label:"Your City",placeholder:"e.g. Miami"}]} onSubmit={handleUserSignup} onGoogle={handleGoogleAuth} onApple={handleAppleAuth} switchLabel="Already have an account?" onSwitch={()=>nav("login")}/>}
        {currentPage==="signup-dj"&&<AuthForm title="DJ Sign Up" subtitle="Get booked for private remote sessions worldwide" cta="Create DJ Profile →" fields={[{key:"djName",label:"Stage Name",placeholder:"DJ ___",required:true},{key:"email",label:"Email",type:"email",placeholder:"you@email.com",required:true},{key:"password",label:"Password",type:"password",placeholder:"••••••••",required:true},{key:"city",label:"City",placeholder:"e.g. New York",required:true},{key:"fee",label:"Hourly Rate ($)",type:"number",placeholder:"e.g. 100",required:true,note:"What you charge per hour of remote mixing"},{key:"minHours",label:"Minimum Session (hours)",type:"number",placeholder:"e.g. 2"},{key:"genres",label:"Music Genres",type:"genres"},{key:"events",label:"Event Types",type:"events"},{key:"bio",label:"Your Bio",type:"textarea",placeholder:"Tell hosts what makes your remote sets special…"}]} onSubmit={handleDJSignup} switchLabel="Already have an account?" onSwitch={()=>nav("login")}/>}
        {currentPage==="browse"&&<Browse djs={djs} onBook={handleBook} onProfile={dj=>setProfileDJ(dj)}/>}
        {currentPage==="profile"&&profileDJ&&<DJProfile dj={profileDJ} user={user} onBook={handleBook} onReview={(dj)=>setReviewTarget({dj,booking:null})} onBack={()=>setProfileDJ(null)} onHelpful={handleHelpful} reviewOverrides={reviewOverrides}/>}
        {currentPage==="user-dash"&&user&&<UserDashboard user={user} bookings={bookings} onJoinSession={b=>setActiveSession(b)} onReview={(dj,b)=>setReviewTarget({dj,booking:b})}/>}
        {currentPage==="dj-dash"&&user&&<DJDashboard user={user} djs={djs}/>}
      </div>
      {bookingTarget&&<BookingModal dj={bookingTarget} onClose={()=>setBookingTarget(null)} onConfirm={b=>{handleConfirm(b);setBookingTarget(null);setPage("user-dash");}}/>}
      {reviewTarget&&<WriteReview dj={reviewTarget.dj} user={user} booking={reviewTarget.booking} onClose={()=>setReviewTarget(null)} onSubmit={r=>{handleSubmitReview(reviewTarget.dj.id,r);setReviewTarget(null);}}/>}
    </div>
  );
}

const styles=`
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes scanline{0%{background-position:0%}100%{background-position:200%}}
  @keyframes blink{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
  *{box-sizing:border-box}
  input,select,textarea{color:#EDF2FB!important}
  select option{background:#0C1528}
  input[type=range]{-webkit-appearance:none;height:4px;border-radius:2px;background:#1C2C44;cursor:pointer}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#FF6B1A;margin-top:-5px}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:#0C1528}
  ::-webkit-scrollbar-thumb{background:#1C2C44;border-radius:2px}
  ::placeholder{color:#4A6285}
`;
