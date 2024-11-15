"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="font-bold text-lg md:text-2xl">{title}</ModalHeader>
                <ModalBody>
                    <p>{message}</p>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onClose} color="secondary">
                        No
                    </Button>
                    <Button onPress={onConfirm} color="primary">
                        Sí
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;
