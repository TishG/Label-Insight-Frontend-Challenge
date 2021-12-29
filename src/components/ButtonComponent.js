const ButtonComponent = ({
  onClick,
  ariaLabel,
  dataBSDismiss,
  classNames,
  type,
  name,
  dataTestId,
}) => (
  <button
    type={type || 'button'}
    className={`btn ${classNames || null}`}
    data-bs-dismiss={dataBSDismiss || null}
    aria-label={ariaLabel || null}
    onClick={onClick || null}
    data-testid={dataTestId || null}
  >
    {name || null}
  </button>
);

export default ButtonComponent;
