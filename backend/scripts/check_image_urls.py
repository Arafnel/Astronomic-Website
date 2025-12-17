import re
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

seed_path = 'c:/My_programs/Astronomic-Website/backend/seed_data.py'
with open(seed_path, 'r', encoding='utf-8') as f:
    text = f.read()

urls = re.findall(r'image_url\s*=\s*"(https?://[^"]+)"', text)
print(f'Found {len(urls)} URLs')

for u in urls:
    req = Request(u, method='HEAD', headers={'User-Agent':'Mozilla/5.0'})
    try:
        resp = urlopen(req, timeout=10)
        code = resp.getcode()
        print(code, u)
    except HTTPError as e:
        print(e.code, u)
    except URLError as e:
        print('ERR', u, e.reason)
    except Exception as e:
        print('EX', u, str(e))
