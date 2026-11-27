"""Regenerates public/og/*.jpg (1200x630). Run from the repo root: python3 scripts/og.py"""
import base64, pathlib
from playwright.sync_api import sync_playwright

root = pathlib.Path.cwd()
def data(path, mime):
    return f"data:{mime};base64," + base64.b64encode((root / path).read_bytes()).decode()
font = lambda n: data(f"resume/fonts/{n}.woff2", "font/woff2")

# slug: (title, line, background, text, metrics, image)
CARDS = {
  "home": ("Prabhu Siddarth", "AI backend engineering student. Python, FastAPI, Java.", "#E8602E", "#0d0b08",
           [("600+", "sidd-ai downloads"), ("7", "clouds in one disk")], data("public/portrait-cutout.webp", "image/webp")),
  "sidd-ai": ("sidd-ai", "Any AI model, one line of Java.", "#08080D", "#ECEAF6",
           [("600+", "Maven Central downloads"), ("8", "AI providers")], data("public/logos/sidd-ai.png", "image/png")),
  "nexuscloud": ("NexusCloud", "Seven free tiers, one disk.", "#E6EBF1", "#0A1626",
           [("7", "cloud providers"), ("70GB+", "free tiers"), ("0", "bytes proxied")], data("public/logos/nexuscloud.svg", "image/svg+xml")),
  "coedit": ("Coedit", "Realtime docs, sheets and an AI council.", "#F2E8D0", "#121210",
           [("3", "files per council run"), ("30s", "live role re-check")], data("public/logos/coedit.svg", "image/svg+xml")),
  "swara": ("Swara", "Offline karaoke, on your phone.", "#000000", "#F2F2F7",
           [("~23ms", "latency added"), ("No", "internet permission")], data("public/logos/swara.png", "image/png")),
}
CSS = f"""@font-face{{font-family:S;src:url({font('InstrumentSerif-400-normal')})}}
@font-face{{font-family:G;src:url({font('Geist-500-normal')})}}
*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:630px;position:relative;overflow:hidden;font-family:G}}
.c{{position:absolute;inset:60px 72px;display:flex;flex-direction:column}}
h1{{font:400 124px/1 S;white-space:nowrap}}p{{font-size:34px;line-height:1.3;margin-top:18px;max-width:640px}}
.m{{display:flex;gap:44px;margin-top:auto;margin-bottom:34px}}.m b{{display:block;font:400 104px/1 S}}.m span{{font-size:22px}}
small{{font-size:24px}}img{{position:absolute}}.logo{{right:80px;top:170px;width:270px;height:270px;object-fit:contain;border-radius:28px}}
.face{{right:30px;bottom:0;height:560px}}"""

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    for slug, (title, line, bg, fg, metrics, img) in CARDS.items():
        m = "".join(f"<div><b>{v}</b><span>{label}</span></div>" for v, label in metrics)
        cls = "face" if slug == "home" else "logo"
        page.set_content(f"<style>{CSS}</style><body style='background:{bg};color:{fg}'><img class={cls} src='{img}'>"
                         f"<div class=c><h1>{title}</h1><p>{line}</p><div class=m>{m}</div><small>prabhusiddarth.dev</small></div></body>")
        page.evaluate("document.fonts.ready")
        page.screenshot(path=f"public/og/{slug}.jpg", type="jpeg", quality=90)
    browser.close()
