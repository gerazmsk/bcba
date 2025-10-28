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
    :root{
      --brand-blue:#37A0C8;
      --accent-coral:#F15A59;
      --ink:#1F2937;
      --muted:#6B7280;
      --paper:#FFFFFF;
      --footer:#0F172A;
      --radius:12px;
      --shadow:0 0 0 1px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06);
    }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0;background:var(--paper);color:var(--ink)}
    body{font-family:Inter,Segoe UI,Roboto,Arial,sans-serif}
    .page{width:612px;padding:20px;margin:0 auto;box-sizing:border-box}
    h1,h2,h3,p{margin:0}
    img{display:block}
    .header-row{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:20px}
    .brand{width:255px;height:99px;display:flex;align-items:center;justify-content:center;overflow:hidden}
    .brand-logo{width:255px;height:99px;object-fit:contain}
    .name-section{width:306px;height:128px;display:flex;flex-direction:column;justify-content:center}
    .meet{margin-top:8px;font-size:11px;color:var(--muted);letter-spacing:.5px;text-transform:uppercase}
    .name{margin-top:6px;font-size:36px;font-weight:800;line-height:1.05}
    .bcba{margin-top:4px;font-size:22px;font-weight:800;color:var(--brand-blue)}
    .photo-container{width:248px;height:234px;display:flex;align-items:center;justify-content:center}
    .headshot{width:180px;height:180px;object-fit:cover;border-radius:16px;box-shadow:var(--shadow)}
    .section-title{margin:20px 0 12px;font-weight:700;font-size:16px}
    .about{width:612px;height:279px;font-size:13px;line-height:1.6;color:#333;text-align:justify;column-count:2;column-gap:20px;column-fill:auto;overflow:hidden}
    .band{width:612px;height:258px;margin-top:20px;background:var(--accent-coral);color:#fff;border-radius:14px;padding:20px;overflow:hidden}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 20px;height:100%;width:100%}
    .chip-label{font-size:10px;text-transform:uppercase;opacity:.95;letter-spacing:.4px;font-weight:600}
    .chip-value{margin-top:4px;font-size:15px;font-weight:700;line-height:1.3}
    .footer{margin-top:20px;background:var(--footer);color:#fff;border-radius:10px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
    .foot-left{font-size:13px;font-weight:700}
    .foot-right{font-size:12px;opacity:.95}
    @page{margin:10mm}
  </style>
</head>
<body>
    <div class="page">
    <div class="brand">
      <img class="brand-logo" src="{{logo_url}}" alt="Brand logo" />
    </div>
    <div class="header-row">
      <div class="name-section">
        <div class="meet">Meet your therapist</div>
        <h1 class="name">{{first_name}} {{last_name}}</h1>
        <div class="bcba">BCBA</div>
      </div>
      <div class="photo-container">
        <img class="headshot" src="{{headshot_url}}" alt="{{first_name}} {{last_name}}" />
      </div>
    </div>
    <h3 class="section-title">About</h3>
    <div class="about">
      {{about}}
    </div>
    <div class="band">
      <div class="grid">
        <div>
          <div class="chip-label">Hometown</div>
          <div class="chip-value">{{home_town}}</div>
        </div>
        <div>
          <div class="chip-label">Current city</div>
          <div class="chip-value">{{current_city}}</div>
        </div>
        <div>
          <div class="chip-label">Happy place</div>
          <div class="chip-value">{{happy_place}}</div>
        </div>
        <div>
          <div class="chip-label">Favorite color</div>
          <div class="chip-value">{{favorite_color}}</div>
        </div>
        <div>
          <div class="chip-label">Favorite hobby</div>
          <div class="chip-value">{{favorite_hobby}}</div>
        </div>
        <div>
          <div class="chip-label">Favorite food</div>
          <div class="chip-value">{{favorite_food}}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="foot-left">(888) 880-9244</div>
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

