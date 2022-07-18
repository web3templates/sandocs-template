import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SideNav } from "@components/sidebar";
export default function MobileMenu(props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className=" ">
        <HamburgerMenuIcon className="w-5 h-5" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="flex min-h-full ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="  -translate-x-full"
              enterTo="  translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="  translate-x-0"
              leaveTo="  -translate-x-full">
              <Dialog.Panel className="w-max h-screen max-w-[calc(100%-3rem)] fixed  top-0 left-0  transform bg-white overflow-y-auto   shadow-xl   transition-all">
                <SideNav
                  items={props.sidebar}
                  active={props.active}
                  mobile={true}
                  closeModal={closeModal}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
