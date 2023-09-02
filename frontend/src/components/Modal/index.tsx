import { ReactNode, MouseEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;

  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (e.target.id === "modal") onClose();
  };

  return (
    <div
      id="modal"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOnClose}
    >
      <div className="bg-white w-[600px] rounded-md p-4">
        <div className="flex justify-end">
          <AiOutlineClose
            className="text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
