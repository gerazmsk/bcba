import html2pdf from 'html2pdf.js';
import { Profile } from './types';

const DEFAULT_LOGO = 'https://utbnvtrquhdurakxrvql.supabase.co/storage/v1/object/public/profiles/Butterfly-Effects-20-Year-Anniversary.svg';

function esc(v?: string | null) {
  return (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const TEMPLATE_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>{{first_name}} {{last_name}} — BIO</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    @page { margin: 0; }
    :root{
      --ink:#2B2936;
      --text:#333741;
      --muted:#8A8FA0;
      --bcba:#2AA0C6;
      --band:#E65E61;
      --footer:#35A3C7;
      --paper:#ffffff;
      --radius:14px;
      --shadow:0 10px 24px rgba(0,0,0,.06);
      --maxw:860px;
    }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0;background:var(--paper);color:var(--text)}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Arial,"Noto Sans",sans-serif}
    .page{margin:0 auto;max-width:var(--maxw);padding:18mm 12mm 12mm;overflow:visible}
    img{display:block;max-width:100%;height:auto}
    h1,h3,p{margin:0}
    .header{display:grid;grid-template-columns:1fr auto;align-items:start;gap:24px;margin-bottom:18px}
    .logo-wrap{padding-top:2mm}
    .logo{width:auto;max-width:200px;max-height:48px;object-fit:contain}
    .meet{margin-top:8px;font-size:12px;color:var(--muted);letter-spacing:.3px}
    .name{margin-top:8px;font-size:44px;line-height:1.04;font-weight:800;color:var(--ink)}
    .bcba{margin-top:4px;font-size:28px;font-weight:800;color:var(--bcba)}
    .portrait{width:140px;height:140px;object-fit:cover;border-radius:16px;box-shadow:var(--shadow);margin-top:6px}
    .section-title{margin:24px 0 10px;font-weight:800;color:var(--ink)}
    .about{column-count:2;column-gap:28px;font-size:13px;line-height:1.6;text-align:justify}
    @media (max-width:720px){.about{column-count:1}}
    .band{margin-top:24px;background:var(--band);color:#fff;border-radius:var(--radius);padding:22px}
    .grid{display:grid;gap:20px 24px;grid-template-columns:repeat(3,1fr)}
    @media (max-width:720px){.grid{grid-template-columns:1fr}}
    .chip-label{font-size:12px;text-transform:uppercase;letter-spacing:.4px;opacity:.95}
    .chip-value{margin-top:6px;font-size:20px;line-height:1.25;font-weight:800}
    .footer{margin-top:26px;background:var(--footer);color:#fff;border-radius:10px;padding:12px 16px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
    .foot-left{font-weight:800;font-size:14px}
    .foot-center{display:flex;align-items:center;justify-content:center}
    .foot-right{justify-self:end;font-size:13px}
    .butterfly{width:20px;height:20px;fill:#fff;opacity:.95}
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <div class="logo-wrap">
          <img class="logo" src="{{logo_url}}" alt="Butterfly Effects logo" />
        </div>
        <div class="meet">Meet your therapist</div>
        <h1 class="name">{{first_name}} {{last_name}}</h1>
        <div class="bcba">BCBA</div>
      </div>
      <img class="portrait" src="{{headshot_url}}" alt="{{first_name}} {{last_name}}" />
    </div>
    <h3 class="section-title">About</h3>
    <div class="about">
      {{about}}
    </div>
    <div class="band">
      <div class="grid">
        <div><div class="chip-label">Hometown</div><div class="chip-value">{{home_town}}</div></div>
        <div><div class="chip-label">Current city</div><div class="chip-value">{{current_city}}</div></div>
        <div><div class="chip-label">Happy place</div><div class="chip-value">{{happy_place}}</div></div>
        <div><div class="chip-label">Favorite color</div><div class="chip-value">{{favorite_color}}</div></div>
        <div><div class="chip-label">Favorite hobby</div><div class="chip-value">{{favorite_hobby}}</div></div>
        <div><div class="chip-label">Favorite food</div><div class="chip-value">{{favorite_food}}</div></div>
      </div>
    </div>
    <div class="footer">
      <div class="foot-left">(888) 880–9244</div>
      <div class="foot-center">
        <svg class="butterfly" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 11c1.7-4.5 5.8-6.8 8.2-5.1 2.2 1.5 1.4 5-2.6 6.6 3.8.9 5.4 4 3.6 5.9-1.9 2-5.7.4-7.8-4-2.1 4.4-5.9 6-7.8 4-1.8-1.9-.2-5 3.6-5.9-4-1.6-4.8-5.1-2.6-6.6C6.2 4.2 10.3 6.5 12 11Z"/></svg>
      </div>
      <div class="foot-right">butterflyeffects.com</div>
    </div>
  </div>
</body>
</html>`;

function renderHtmlFromProfile(p: Profile, defaultLogo: string) {
  const headshot = p.logo_url && p.logo_url.trim() ? p.logo_url : defaultLogo;

  return TEMPLATE_HTML
    .replaceAll('{{logo_url}}', esc(defaultLogo))
    .replaceAll('{{headshot_url}}', esc(headshot))
    .replaceAll('{{first_name}}', esc(p.first_name))
    .replaceAll('{{last_name}}', esc(p.last_name))
    .replaceAll('{{about}}', esc(p.about || ''))
    .replaceAll('{{home_town}}', esc(p.home_town || '—'))
    .replaceAll('{{current_city}}', esc(p.current_city || '—'))
    .replaceAll('{{happy_place}}', esc(p.happy_place || '—'))
    .replaceAll('{{favorite_color}}', esc(p.favorite_color || '—'))
    .replaceAll('{{favorite_hobby}}', esc(p.favorite_hobby || '—'))
    .replaceAll('{{favorite_food}}', esc(p.favorite_food || '—'));
}

export function getBioHTML(profile: Profile): string {
  return renderHtmlFromProfile(profile, DEFAULT_LOGO);
}

export async function generateBioPDF(profile: Profile): Promise<void> {
  const html = renderHtmlFromProfile(profile, DEFAULT_LOGO);
  
  const filename = `${profile.first_name}_${profile.last_name}_BIO.pdf`;
  
  const opt = {
    margin: 0 as const,
    filename,
    image: { type: 'jpeg' as const, quality: 0.95 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      letterRendering: true,
      width: 816, // Letter width in pixels at 96 DPI
      height: 1056 // Letter height
    },
    jsPDF: { 
      unit: 'mm' as const, 
      format: [216, 279] as [number, number], // Letter size in mm (8.5" x 11")
      orientation: 'portrait' as const 
    }
  };

  // Create a wrapper to ensure proper centering
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.right = '0';
  wrapper.style.bottom = '0';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'flex-start';
  wrapper.style.justifyContent = 'center';
  wrapper.style.paddingTop = '20px';
  wrapper.style.background = '#f0f0f0';
  wrapper.style.zIndex = '9999';
  
  const element = document.createElement('div');
  element.style.width = '816px';
  element.style.height = '1056px';
  element.style.padding = '0';
  element.style.overflow = 'hidden';
  element.style.background = 'white';
  element.innerHTML = html;
  
  wrapper.appendChild(element);
  
  document.body.appendChild(wrapper);

  // Wait for rendering
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  } finally {
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  }
}

