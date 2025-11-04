import os
import qrcode


def generate_qr(batch_id: int, data: dict):
    os.makedirs("static/qr", exist_ok=True)
    qr_data = f"Farm2Fork Batch: {data}"
    img = qrcode.make(qr_data)
    path = f"static/qr/{batch_id}.png"
    img.save(path)
    return path



