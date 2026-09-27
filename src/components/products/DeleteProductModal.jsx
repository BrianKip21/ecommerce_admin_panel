import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteProductModal({ product, onClose, onConfirm, loading }) {
    return (
        <Modal
            open={!!product}
            onClose={onClose}
            title="Delete product"
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
                Are you sure you want to delete <strong>{product?.title}</strong>? This cannot be undone.
            </p>
        </Modal>
    );
}
