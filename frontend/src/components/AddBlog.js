import React from 'react'

const AddBlog = () => {
    return (
        <div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
            </div>


            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here"></textarea>
                <label for="floatingTextarea">Comments</label>
            </div>

            <div class="form">
                <label class="form-label" for="customFile">Default file input example</label>
                <input type="file" class="form-control" id="customFile" />
            </div>

            <div class="row">
                <div class="col-12">

                  <select class="select form-control-lg">
                    <option value="1" disabled>Choose option</option>
                    <option value="2">Subject 1</option>
                    <option value="3">Subject 2</option>
                    <option value="4">Subject 3</option>
                  </select>
                  <label class="form-label select-label">Choose option</label>

                </div>
              </div>

            <div class="form-floating">
                <input type="file" className='mx-5' name="resume" class="form-control my-1" />
                <label for="floatingTextarea">Comments</label>
            </div>

            <div class="input-group mb-3">
                <input type="file" class="form-control" />
                <label class="input-group-text" for="inputGroupFile02">Upload</label>
            </div>

        </div>
    )
}

export default AddBlog
