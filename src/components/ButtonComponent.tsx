import React from 'react';

interface Props {
  onClick?: () => void;
  ariaLabel: string;
  dataBSDismiss?: string;
  classNames: string;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  name?: string;
  dataTestId?: string;
}

const ButtonComponent: React.FC<Props> = ({
  onClick,
  ariaLabel,
  dataBSDismiss,
  classNames,
  buttonType,
  name,
  dataTestId,
}) => (
  <button
    type={buttonType}
    className={`btn ${classNames || ''}`}
    data-bs-dismiss={dataBSDismiss || undefined}
    aria-label={ariaLabel || undefined}
    onClick={onClick}
    data-testid={dataTestId || undefined}
  >
    {name || null}
  </button>
);

export default ButtonComponent;
