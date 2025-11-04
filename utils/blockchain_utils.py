import uuid


def register_batch(batch_id: int, crop_type: str):
    return f"0x{uuid.uuid4().hex[:12]}"


