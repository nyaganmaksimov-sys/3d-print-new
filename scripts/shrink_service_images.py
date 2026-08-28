from pathlib import Path

path = Path('index.html')
html = path.read_text(encoding='utf-8')

marker = '/* Service image sizing: compact with visible breathing room */'
start = html.find(marker)
if start != -1:
    style_end = html.find('</style>', start)
    if style_end == -1:
        raise SystemExit('Closing </style> not found')
    html = html[:start] + html[style_end:]

css = '''
/* Service image sizing: compact with visible breathing room */
.modal-card img, .service-modal img, .service-detail img, .service-detail-media img {
  display: block;
  width: min(72%, 520px);
  max-width: 520px;
  height: auto;
  max-height: 420px;
  object-fit: contain;
  margin: 0 auto 28px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(255,255,255,.035);
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: 0 18px 50px rgba(0,0,0,.35);
}
@media (max-width:760px) {
  .modal-card img, .service-modal img, .service-detail img, .service-detail-media img {
    width: 86%;
    max-width: 420px;
    max-height: 300px;
    margin-bottom: 20px;
    padding: 10px;
  }
}
'''

style_marker = '</style>'
if style_marker not in html:
    raise SystemExit('Closing </style> not found')

html = html.replace(style_marker, css + style_marker, 1)
path.write_text(html, encoding='utf-8')
print('Service image sizing updated')
