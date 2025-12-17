import re
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

seed_path = 'seed_data.py'
with open(seed_path, 'r', encoding='utf-8') as f:
    text = f.read()

urls = re.findall(r'image_url="(https?://[^"]+)"', text)
failed = []

for url in urls:
    req = Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urlopen(req, timeout=10)
        code = resp.getcode()
        if code != 200:
            print(f"❌ {code} {url}")
            failed.append(url)
    except HTTPError as e:
        print(f"❌ {e.code} {url}")
        failed.append(url)
    except Exception as e:
        print(f"❌ ERR {url}")
        failed.append(url)

print(f"\n✅ Работают: {len(urls) - len(failed)}/{len(urls)}")
if failed:
    print(f"❌ Не работают {len(failed)}:")
    for u in failed:
        print(f"  {u}")
