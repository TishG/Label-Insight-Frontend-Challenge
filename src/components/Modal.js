import classNames from 'classnames';
import { IMAGE_MODAL, DESCRIPTION_FORM_CONTROL } from '../consts';

import ButtonComponent from './ButtonComponent';

const Modal = ({
  imageTitle,
  imageUrl,
  imageDescription,
  isTyping,
  showForm,
  typedDescription,
  handleShowForm,
  handleChange,
  handleCancelForm,
  handleSave,
}) => (
  <div
    className="modal fade"
    id={IMAGE_MODAL}
    tabIndex="-1"
    aria-labelledby="imageModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center">{imageTitle}</h5>
          <ButtonComponent
            classNames={classNames('btn-close')}
            dataBSDismiss="modal"
            ariaLabel="Close"
          />
        </div>
        <div className="modal-body">
          <img
            src={imageUrl}
            className="img-fluid"
            alt={imageTitle}
          />
          {(imageDescription && !isTyping && !showForm && (
            <div className="description text-center">
              <div>{imageDescription}</div>
              <ButtonComponent
                classNames={classNames('btn-primary', 'mt-1')}
                onClick={handleShowForm}
                ariaLabel="Edit Description"
                name="Edit description"
              />
            </div>
          )) ||
            (!imageDescription && !showForm && (
              <div className="text-center">
                <ButtonComponent
                  classNames={classNames('btn-primary', 'mt-1')}
                  onClick={handleShowForm}
                  ariaLabel="Add Description"
                  name="Add a description"
                />
              </div>
            )) ||
            (showForm && (
              <div className="mb-3 text-center">
                <label
                  htmlFor={DESCRIPTION_FORM_CONTROL}
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => handleChange(e)}
                  placeholder="Relaxing on the beach with purple sunglasses on. It's a sunny, june day."
                  className="form-control mb-1"
                  id={DESCRIPTION_FORM_CONTROL}
                  rows="3"
                  value={typedDescription || undefined}
                ></textarea>
                <div className="d-flex justify-content-end">
                  <ButtonComponent
                    classNames={classNames('btn-danger', 'mx-1')}
                    onClick={handleCancelForm}
                    ariaLabel="Cancel Form"
                    name="Cancel"
                  />
                  <ButtonComponent
                    type="submit"
                    classNames={classNames('btn-primary')}
                    onClick={handleSave}
                    ariaLabel="Save Description"
                    name="Save"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="modal-footer">
          <ButtonComponent
            classNames={classNames('btn-secondary')}
            dataBSDismiss="modal"
            ariaLabel="Close Modal"
            name="Close"
          />
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
