import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteCategoryModal({ category, onClose, onConfirm, loading }) {
    return (
        <Modal
            open={!!category}
            onClose={onClose}
            title="Delete category"
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
                Delete <strong>{category?.name}</strong>? Products using this category must be reassigned first.
            </p>
        </Modal>
    );
}
