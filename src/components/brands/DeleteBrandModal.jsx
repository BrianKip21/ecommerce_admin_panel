import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteBrandModal({ brand, onClose, onConfirm, loading }) {
    return (
        <Modal
            open={!!brand}
            onClose={onClose}
            title="Delete brand"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm} disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </>
            }
        >
            <p className="text-[13px] text-neutral-600">
                Delete <strong>{brand?.name}</strong>? Products using this brand must be reassigned first.
            </p>
        </Modal>
    );
}
