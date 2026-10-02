import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteCollectionModal({
    collection,
    onClose,
    onConfirm,
    loading
}) {
    return (
        <Modal
            open={!!collection}
            onClose={loading ? undefined : onClose}
            title="Delete collection"
            footer={
                <>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete collection"}
                    </Button>
                </>
            }
        >
            <p className="text-[13px] leading-5 text-neutral-600">
                Are you sure you want to delete{" "}
                <strong className="text-neutral-900">
                    {collection?.name}
                </strong>
                ?
            </p>

            <p className="mt-2 text-[13px] leading-5 text-neutral-500">
                The products in this collection will not be
                deleted. They will simply no longer be associated
                with this collection.
            </p>
        </Modal>
    );
}