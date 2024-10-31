// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
export const useOpenState = ({ onOpen, onClose, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [openedWithKeyboard, setOpenedWithKeyboard] = useState(false);
    const openDropdown = (isKeyboard) => {
        if (!isOpen) {
            setIsOpen(true);
            setOpenedWithKeyboard(!!isKeyboard);
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
    };
    const closeDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    };
    const toggleDropdown = () => {
        if (isOpen) {
            closeDropdown();
        }
        else {
            openDropdown(false);
        }
    };
    return { isOpen, openDropdown, closeDropdown, toggleDropdown, openedWithKeyboard };
};
//# sourceMappingURL=use-open-state.js.map