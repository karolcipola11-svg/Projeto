#!/usr/bin/env python3
"""Serve the project locally and open its preview in the default browser."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Timer
import os
import webbrowser


HOST = "127.0.0.1"
PORT = 4173
PROJECT_ROOT = Path(__file__).resolve().parent.parent
URL = f"http://localhost:{PORT}"


def open_browser() -> None:
    """Open the preview only after the local server is ready."""
    webbrowser.open(URL)


def main() -> None:
    os.chdir(PROJECT_ROOT)
    server = ThreadingHTTPServer((HOST, PORT), SimpleHTTPRequestHandler)

    print("\nPrévia pronta!", flush=True)
    print(f"Abra no navegador: {URL}\n", flush=True)
    Timer(0.5, open_browser).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nPrévia encerrada.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
