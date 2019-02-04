import React from 'react';
import { Form, Button, Checkbox, Dropdown, Grid} from 'semantic-ui-react';
import InputField from 'components/common/Forms/FormField';
import TextArea from 'components/common/Forms/TextArea';
import { Editor } from '@tinymce/tinymce-react';
import Dropzone from 'react-dropzone';
import { DOCUMENT_URL } from 'containers/App/constants';
import SearchableDropDown from "components/common/Forms/Dropdown";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const BlogsCreateForm = props => {
  const {data,  errors,  handleSubmit, handleChange, isRequesting, handleEditorChange, urlAction, onDrop, file, handleOptionSelect, renderCategoryOption,
    handleActiveChecked, handleFeaturedChecked, handleTagAddition, handleTags, tagOptions, parseDate, handlePublishDateChange, categories, handleStatusChange }=props;
  const showImage = (file) => {
    if (['image/png', 'image.jpg', 'image/jpeg'].includes(file.type)) {
      return (
          <div className="card card-md">
            <img src={file.preview} alt="" />
          </div>
      );
    }
    else if(data.main_image!=null)
    {
      return (
          <div className="card card-md">
            <img src={`${DOCUMENT_URL}${data.main_image.document_name}`} alt=""/>
          </div>
      );
    }
  };
  const statusOptions = [
    { key: '1', value: 'Pending', text: 'Pending' },
    { key: '2', value: 'Approved', text: 'Approved' },
    { key: '3', value: 'Active', text: 'Active' },
  ];
  const summary_length=200;

  return (
      <Form onSubmit={handleSubmit}>
        <InputField
            type="text"
            name="title"
            label="Blog Title"
            value={data.title || ''}
            error={errors.title && errors.title}
            onChange={handleChange}
        />


        <div className={`field ${errors.category_id && 'error'}`}>
          <label>Category</label>
          <select
              className={`fluid dropdown ${errors.category_id && 'error'}`}
              name="category_id"
              onChange={handleOptionSelect}
              value={data.category_id}
          >
            <option>
              {categories && categories.length > 0 ? 'Select Category' : 'Loading...'}
            </option>
            {categories && categories.length >= 1 && renderCategoryOption()}
          </select>

        </div>

        {/*<label>Select Category</label>*/}
        {/*<select className="fluid dropdown" onChange={handleOptionSelect}>*/}
          {/*<option>{categories && categories.length > 0 ? 'select' : 'loading...'}</option>*/}
          {/*{categories && categories.length >= 1 && renderOption(categories)}*/}
        {/*</select>*/}
        <InputField
            type="text"
            name="author"
            label="Author Name"
            value={data.author || ''}
            error={errors.author}
            onChange={handleChange}
        />

        <TextArea
            name="summary"
            label={`Summary (Max. ${summary_length-(data.summary && data.summary.length || 0)} characters)`}
            value={data.summary || ''}
            error={errors.summary}
            onChange={handleChange}
            //200 letters
        />

        <label> Description </label>
        {/*<textarea*/}
            {/*type="text"*/}
            {/*name="description"*/}
            {/*label="Description"*/}
            {/*value={data.description || ''}*/}
            {/*// error={errors.summary && props.errors.summary}*/}
            {/*onChange={handleChange}*/}
        {/*/>*/}
        {(data.description || urlAction=='create')  && <Editor
        apiKey="5g5faf78gvk6yfq9bd3bbfjo858kjx1q8o0nbiwtygo2e4er"
        initialValue={data.description || ''}
        init={{
        plugins: 'link image code textcolor colorpicker',
        toolbar: 'undo redo | bold italic underline |  alignleft aligncenter alignright | code | image | forecolor backcolor',
        }}
        onChange={handleEditorChange}
        />}
        <span className="red">{errors.description}</span>

        <Dropzone
            className="dropzone"
            onDrop={onDrop}
            multiple={false}
            accept=".jpg, .jpeg, .png"
        >
          Drop Image <strong>(recommended size (700*350))</strong>
        </Dropzone>
        {file && showImage(file)}

        <SearchableDropDown
            options={tagOptions}
            multiple
            search
            allowAdditions
            onAddItem={handleTagAddition}
            onChange={handleTags}
            label="Tags"
            value={data.tags || []}
            error={errors.tags?true:false}
            required
        />

        <TextArea
            name="meta_description"
            label="Meta Description"
            value={data.meta_description || ''}
            error={errors.summary}
            onChange={handleChange}
        />

        <InputField
            type="number"
            name="minute_read"
            label="Read Time (in Minutes)"
            value={data.minute_read || ''}
            error={errors.minute_read && errors.minute_read}
            onChange={handleChange}
        />

        <div className="field">
          <label htmlFor="published_date">
            Publish Date
          </label>
          <DatePicker
              fluid
              placeholder="Enter Publish Date*"
              value={parseDate(data.published_date || new Date())}
              onChange={handlePublishDateChange}
              error={errors.published_date}
              required
          />
        </div>

        <Form.Field>
          <label htmlFor="Request Method">Status</label>
          <Dropdown
              placeholder='Select Status'
              fluid
              search
              selection
              name="status"
              options={statusOptions}
              value={data.status || ''}
              onChange={handleStatusChange}
              error={errors.status?true:false}

          />
        </Form.Field>

        <div className="field">

        <label className="custom-control custom-checkbox">
          <input
              type="checkbox"
              className="custom-control-input"
              onChange={handleActiveChecked}
              checked={data.is_active || false}
          />
          <span className="custom-control-indicator" />
          <span className="custom-control-description">Active</span>
        </label>

        <label className="custom-control custom-checkbox">
          <input
              type="checkbox"
              className="custom-control-input"
              onChange={handleFeaturedChecked}
              checked={data.featured || false}
          />
          <span className="custom-control-indicator" />
          <span className="custom-control-description">Featured</span>
        </label>
        </div>




        <Button
            className="button primary"
            loading={props.isRequesting}
            disabled={props.isRequesting}
        >
          Submit
        </Button>

      </Form>
  )
}

export default BlogsCreateForm;



Collapse 
