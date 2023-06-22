import { cloneElement } from "react"

export const EditModal = (props: any) => cloneElement(props.modal, { modalType: 'edit', data: props.data });