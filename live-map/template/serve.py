# Local preview: python3 serve.py [port] -> http://localhost:<port>. Reloads when files change.
import http.server, os, socket, socketserver, sys
HERE = os.path.dirname(os.path.abspath(__file__))
def free_port():
    with socket.socket() as s:
        s.bind(('127.0.0.1', 0)); return s.getsockname()[1]
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else free_port()
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=HERE, **k)
    def log_message(self, *a): pass
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store'); super().end_headers()
    def do_GET(self):
        if self.path == '/__v':
            v = str(max(os.path.getmtime(os.path.join(HERE, f)) for f in os.listdir(HERE))).encode()
            self.send_response(200); self.send_header('Content-Type', 'text/plain'); self.end_headers(); self.wfile.write(v); return
        return super().do_GET()
socketserver.TCPServer.allow_reuse_address = True
print(f'http://localhost:{PORT}', flush=True)
with socketserver.ThreadingTCPServer(('127.0.0.1', PORT), H) as s: s.serve_forever()
