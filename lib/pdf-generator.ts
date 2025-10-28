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
    .page{padding:28px}
    h1,h2,h3,p{margin:0}
    img{display:block;max-width:100%}
    .top{display:flex;align-items:flex-start;justify-content:space-between;gap:24px}
    .brand{display:flex;align-items:center;gap:10px}
    .brand-logo{width:180px;height:auto}
    .meet{margin-top:14px;font-size:12px;color:var(--muted);letter-spacing:.3px}
    .name{margin-top:6px;font-size:40px;font-weight:800;line-height:1.05}
    .bcba{margin-top:2px;font-size:26px;font-weight:800;color:var(--brand-blue)}
    .headshot-wrap{position:relative}
    .headshot{width:132px;height:132px;object-fit:cover;border-radius:16px;box-shadow:var(--shadow)}
    .section-title{margin:22px 0 10px;font-weight:700;font-size:16px}
    .about{font-size:13px;line-height:1.6;color:#333;text-align:justify}
    .band{margin-top:24px;background:var(--accent-coral);color:#fff;border-radius:14px;padding:18px}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 18px}
    .chip-label{font-size:11px;text-transform:uppercase;opacity:.9;letter-spacing:.35px}
    .chip-value{margin-top:4px;font-size:16px;font-weight:700;line-height:1.25}
    .footer{margin-top:22px;background:var(--footer);color:#fff;border-radius:10px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
    .foot-left{font-size:13px;font-weight:700}
    .foot-right{font-size:12px;opacity:.95}
    @page{margin:10mm}
  </style>
</head>
<body>
  <div class="page">
    <div class="top">
      <div>
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
  
  const opt = {
    margin: [0, 0, 0, 0] as [number, number, number, number],
    filename: `${profile.first_name}_${profile.last_name}_BIO.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' as const 
    }
  };

  const element = document.createElement('div');
  element.innerHTML = html;
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.width = '210mm';
  element.style.padding = '0';
  document.body.appendChild(element);

  // Wait a bit for images to load
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    const worker = html2pdf().set(opt).from(element);
    await worker.save();
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  } finally {
    if (document.body.contains(element)) {
      document.body.removeChild(element);
    }
  }
}

