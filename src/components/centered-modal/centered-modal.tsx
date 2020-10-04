import React, { FunctionComponent } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import styles from './centered-modal.module.css';

export type CenteredModalProps = Omit<ReactModalProps, 'className'>;

export const CenteredModal: FunctionComponent<CenteredModalProps> = (props) => (
  <ReactModal {...props} className={styles['centered-modal-content']} />
);
