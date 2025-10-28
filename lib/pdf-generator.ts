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
      --footer-blue:#0D7377;
      --radius:12px;
      --shadow:0 0 0 1px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06);
    }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0;background:var(--paper);color:var(--ink)}
    body{font-family:Inter,Segoe UI,Roboto,Arial,sans-serif}
    .page{max-width:816px;margin:0 auto;padding:28px}
    h1,h2,h3,p{margin:0}
    img{display:block;max-width:100%}
    .top{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;margin-bottom:16px}
    .brand{display:flex;align-items:center;gap:10px;margin-bottom:12px}
    .brand-logo{width:180px;height:auto}
    .meet{margin-top:8px;font-size:12px;color:var(--muted);letter-spacing:.3px;text-transform:uppercase}
    .name{margin-top:8px;font-size:42px;font-weight:700;line-height:1.1;color:#000}
    .bcba{margin-top:4px;font-size:28px;font-weight:700;color:var(--brand-blue)}
    .headshot-wrap{position:relative}
    .headshot{width:140px;height:140px;object-fit:cover;border-radius:16px;box-shadow:var(--shadow)}
    .section-title{margin:24px 0 12px;font-weight:700;font-size:16px;color:#000}
    .about{font-size:13px;line-height:1.7;color:#333;text-align:justify;column-count:2;column-gap:20px;column-fill:auto}
    .band{margin-top:24px;background:var(--accent-coral);color:#fff;border-radius:14px;padding:20px}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 20px}
    .chip-label{font-size:11px;text-transform:uppercase;opacity:.95;letter-spacing:.4px;font-weight:600}
    .chip-value{margin-top:6px;font-size:16px;font-weight:700;line-height:1.3}
    .footer{margin-top:22px;background:var(--footer-blue);color:#fff;border-radius:10px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between}
    .foot-left{font-size:14px;font-weight:700}
    .foot-right{font-size:13px;opacity:.95}
    @page{margin:10mm}
  </style>
</head>
<body>
  <div class="page">
    <div class="top">
      <div style="flex:1">
        <div class="brand">
          <img class="brand-logo" src="{{logo_url}}" alt="Brand logo" />
        </div>
        <div class="meet">Meet your therapist</div>
        <h1 class="name">{{first_name}} {{last_name}}</h1>
        <div class="bcba">BCBA</div>
      </div>
      <div class="headshot-wrap">
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

  // Create a visible container first to render properly
  const element = document.createElement('div');
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.width = '816px';
  element.style.height = '1056px';
  element.style.padding = '0';
  element.style.margin = '0';
  element.style.overflow = 'hidden';
  element.style.zIndex = '9999';
  element.style.background = 'white';
  element.innerHTML = html;
  
  document.body.appendChild(element);

  // Wait for rendering
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  } finally {
    if (document.body.contains(element)) {
      document.body.removeChild(element);
    }
  }
}

