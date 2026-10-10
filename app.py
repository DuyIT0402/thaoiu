import http.server
import json
import os
import sys
import urllib.parse
from datetime import datetime
import webbrowser
import threading

# Cấu hình UTF-8 cho console trên Windows
if sys.platform == "win32":
    try:
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8")
        if hasattr(sys.stderr, "reconfigure"):
            sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PORT = 5000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_DIR = os.path.join(BASE_DIR, "data")
WISHES_FILE = os.path.join(DATA_DIR, "wishes.json")
START_DATE_STR = "2026-01-20T00:00:00"

os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(WISHES_FILE):
    with open(WISHES_FILE, "w", encoding="utf-8") as f:
        json.dump([
            {
                "id": 1,
                "sender": "Chồng yêu",
                "content": "20/01/2026 - Ngày kỳ diệu nhất cuộc đời anh, ngày mà hai trái tim chính thức thuộc về nhau. Yêu vợ mãi mãi! ❤️",
                "timestamp": "2026-01-20 00:00:00"
            }
        ], f, ensure_ascii=False, indent=2)

ROMANTIC_QUOTES = [
    "Nếu như có một tỷ người trên thế giới yêu em, anh sẽ là một trong số đó. Nếu chỉ còn một người yêu em, thì người đó chính là anh.",
    "Khoảng cách địa lý chỉ thử thách lòng kiên nhẫn, chứ chẳng thể nào làm giảm đi tình yêu anh dành cho vợ.",
    "Cảm ơn định mệnh đã mang em đến bên đời anh vào ngày 20/01/2026. Từng ngày bên em là từng ngày ngập tràn phép màu.",
    "Trong mắt anh, thế giới rộng lớn vô cùng, nhưng điều rực rỡ và quý giá nhất chỉ gói gọn trong nụ cười của vợ.",
    "Anh không hứa sẽ mang cho em cả vũ trụ, nhưng anh hứa cả vũ trụ của anh sẽ mãi mãi chỉ có một mình em.",
    "Dù mai này tóc có điểm bạc, đôi bàn tay có nhăn nheo, anh vẫn sẽ nắm chặt tay em như những ngày đầu tiên."
]

class LoveHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            start_dt = datetime.fromisoformat(START_DATE_STR)
            now_dt = datetime.now()
            diff = now_dt - start_dt

            days = diff.days
            seconds = diff.seconds
            hours = seconds // 3600
            minutes = (seconds % 3600) // 60
            secs = seconds % 60

            # Calculate next milestones
            milestones = [100, 200, 365, 500, 730, 1000]
            next_milestone = None
            for m in milestones:
                if days < m:
                    next_milestone = {"target_days": m, "days_left": m - days}
                    break

            res = {
                "start_date": START_DATE_STR,
                "server_time": now_dt.strftime("%Y-%m-%d %H:%M:%S"),
                "total_days": max(days, 0),
                "hours": hours,
                "minutes": minutes,
                "seconds": secs,
                "total_seconds": max(int(diff.total_seconds()), 0),
                "next_milestone": next_milestone
            }
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode("utf-8"))
            return

        elif path == "/api/wishes":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            try:
                with open(WISHES_FILE, "r", encoding="utf-8") as f:
                    wishes = json.load(f)
            except Exception:
                wishes = []

            self.wfile.write(json.dumps(wishes, ensure_ascii=False).encode("utf-8"))
            return

        elif path == "/api/quotes":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(ROMANTIC_QUOTES, ensure_ascii=False).encode("utf-8"))
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/wishes":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)

            try:
                body = json.loads(post_data.decode("utf-8"))
                sender = body.get("sender", "Vợ yêu").strip() or "Vợ yêu"
                content = body.get("content", "").strip()

                if not content:
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "Nội dung không được để trống"}, ensure_ascii=False).encode("utf-8"))
                    return

                try:
                    with open(WISHES_FILE, "r", encoding="utf-8") as f:
                        wishes = json.load(f)
                except Exception:
                    wishes = []

                new_wish = {
                    "id": len(wishes) + 1,
                    "sender": sender,
                    "content": content,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                }
                wishes.insert(0, new_wish)

                with open(WISHES_FILE, "w", encoding="utf-8") as f:
                    json.dump(wishes, f, ensure_ascii=False, indent=2)

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "wish": new_wish, "wishes": wishes}, ensure_ascii=False).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}, ensure_ascii=False).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

def safe_print(*args, **kwargs):
    try:
        print(*args, **kwargs)
    except UnicodeEncodeError:
        text = " ".join(str(a) for a in args)
        print(text.encode("ascii", errors="replace").decode("ascii"), **kwargs)

def run_server(port=PORT):
    for p in [port, port + 1, port + 2, 8080]:
        try:
            server = http.server.ThreadingHTTPServer(("0.0.0.0", p), LoveHandler)
            safe_print("=" * 60)
            safe_print("  [♥]  MÓN QUÀ HUYỀN ẢO DÀNH TẶNG VỢ YÊU  [♥]")
            safe_print("  [*]  Ngày bắt đầu tình yêu: 20/01/2026")
            safe_print(f"  [>]  Website đang chạy tại: http://localhost:{p}")
            safe_print("  [!]  Nhấn Ctrl + C để dừng server.")
            safe_print("=" * 60)
            
            # Tự động mở trình duyệt sau 1s
            threading.Timer(1.0, lambda: webbrowser.open_new_tab(f"http://localhost:{p}")).start()
            server.serve_forever()
            break
        except OSError:
            continue

if __name__ == "__main__":
    port_to_use = PORT
    if len(sys.argv) > 1:
        try:
            port_to_use = int(sys.argv[1])
        except ValueError:
            pass
    run_server(port_to_use)
