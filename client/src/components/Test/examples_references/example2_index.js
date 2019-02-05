import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Toaster from 'components/Toaster';
import moment from 'moment';

import { loadBlogByIdRequest, postBlogRequest ,updateBlogRequest, loadCategoryRequest} from '../actions';


import {
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectError,
  makeSelectSuccess,
  makeSelectSingleData,
  makeSelectCategories,
} from '../selectors';


import BlogsCreateForm from './BlogsCreateForm';
import {Link} from 'react-router-dom';

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  requesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  singleBlog:makeSelectSingleData(),
  categories:makeSelectCategories()
});

const mapDispatchToProps = dispatch => ({
  postBlogRequest: (category_data, file) => dispatch(postBlogRequest(category_data, file)),
  updateBlogRequest: (category_data,blog_id,file) => dispatch(updateBlogRequest(category_data,blog_id,file)),
  loadBlogByIdRequest: (blog_id) => dispatch(loadBlogByIdRequest(blog_id)),
  loadCategories:() => dispatch(loadCategoryRequest()),

});

class CreateCategory extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    data: {
      tags: [],
      featured: false,
      is_active: false,
    },
    errors: {},
    roleModule: {},
    moduleList: [],
    file: [],
    tagOptions: [],
  };

  componentWillMount() {
    let url = this.props.match.path;
    url = url.split('/');
    this.setState({urlAction: url[4]});

  }


  componentDidMount() {
    this.props.loadCategories();
    let blog_id = this.props.match.params.blog_id ? this.props.match.params.blog_id : null;
    if(blog_id){
      this.props.loadBlogByIdRequest(blog_id);
    }

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.categories !== this.props.categories) {
      this.setState({
        categories: nextProps.categories.toJS()
      });
    }

    if (nextProps.singleBlog !== this.props.singleBlog) {
      this.setState(state=>({
        data:nextProps.singleBlog.toJS()
      }))
      this.formatSingleBlog(nextProps.singleBlog.toJS());
    }


  }
  formatSingleBlog = (rawSingleData) => {
    let finalTagOptions=[];
    rawSingleData.tags.map((tag =>
        finalTagOptions.push({text: tag, value:tag})
    ));

    this.setState(state=>({
      tagOptions: finalTagOptions
    }))
    this.setState(state => ({
      data: {
        title:rawSingleData.title,
        author:rawSingleData.author,
        summary:rawSingleData.summary,
        description:rawSingleData.description,
        status:rawSingleData.status,
        category_id:rawSingleData.category_id,
        tags:rawSingleData.tags,
        meta_description:rawSingleData.meta_description,
        featured:rawSingleData.featured,
        is_active:rawSingleData.is_active,
        published_date:rawSingleData.published_date,
        minute_read:rawSingleData.minute_read,
        main_image:rawSingleData.main_image,
      }
    }));

};

  handleChange = e => {
    let errors = this.state.errors;
    if (!!errors[e.target.name] && !!e.target.value) delete errors[e.target.name];
    this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({errors});
    if (Object.keys(errors).length === 0) {
      let blog_id = this.props.match.params.blog_id ? this.props.match.params.blog_id : null;

      if (blog_id) {
        const {data} = this.state;
        this.props.updateBlogRequest(data, blog_id, this.state.file);
      }
      else {
        const {data} = this.state;
        this.props.postBlogRequest(data, this.state.file);
      }

    }
  };

  validate = () => {
    const {data} = this.state;
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.author) errors.author = "Can't be blank";
    if (!data.summary) errors.summary = "Can't be blank";
    if (!data.description) errors.description = "Description field be blank";
    if (!data.category_id) errors.category_id = "Can't be blank";
    if (!data.meta_description) errors.meta_description = "Can't be blank";
    if (!data.published_date) {this.setState(
        {
          data: {
            ...this.state.data,
            published_date: this.parseDate(new Date())
          }
        })};
    if (!data.minute_read) errors.minute_read = "Can't be blank";
    if (!data.minute_read) errors.minute_read = "Can't be blank";
    if (!data.minute_read) errors.minute_read = "Can't be blank";
    if (!data.tags || data.tags.length==0) errors.tags = "Can't be blank";
    if (!data.status) errors.status = "Can't be blank";
    return errors;
  };

  onDrop = file => {
    if (file) {
      file = file[0];
      this.setState({file});
    }
  };


  handleActiveChecked = () =>
    this.setState(state => ({
      data: {...state.data, is_active: !state.data.is_active}
    }));

  handleFeaturedChecked = () =>
    this.setState(state => ({
      data: {...state.data, featured: !state.data.featured}
    }));

  handleTags = (e, {value}) => {
    this.setState({
      data: {...this.state.data, tags: value}
    });
  };

  handleTagAddition = (e, {value}) => {
    this.setState({
      tagOptions: [{text: value, value}, ...this.state.tagOptions]

    });
  };
  handleEmpty = () => {
    let emptyArray = [];
    return emptyArray;
  }

  parseDate = date => {
    const momentDate = moment(date, 'YYYY/MM/DD');
    return momentDate.format('YYYY/MM/DD');
  }

  handlePublishDateChange = (event, data) => {
    let date = event._d;
    this.setState(
      {
        data: {
          ...this.state.data,
          published_date: this.parseDate(date)
        }
      });
  }

  handleOptionSelect = e => {
    let errors  = this.state.errors;
    if (!!errors['category_id'] && !!e.target.value) delete errors['category_id'];
    this.setState({
      data: {
        ...this.state.data,
        category_id: e.target.value,
        categoryID: e.target.value,
        category:e.target.options[e.target.selectedIndex].text
      },
      errors
    });
  };

  handleStatusChange = (e, {name, value}) => {
    let errors = this.state.errors;
    if (!!errors['status'] && !!value) delete errors['status'];
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors
    });
  };

  handleEditorChange = (e) => {
    let errors = this.state.errors;
    if (!!errors['description'] && !!'description') delete errors['description'];
    this.setState({data: {...this.state.data, description: e.target.getContent()}})
  };

  renderCategoryOption = () => {
    const { categories } = this.state;
    return categories.map(name =>
        <option key={name._id} value={`${name._id}`} >
          {name.title}
        </option>
    );
  };


  render() {
    const {data, roleModule, vendor, errors, moduleList, urlAction, file, tagOptions, categories} = this.state;
    const {successResponse, errorResponse, requesting} = this.props;
    let message = null;

    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={5000} error/>;
    }
    return (
      <div className="left container">
        {message && message}
        <Link className="ui button primary" to={`/admin/dashboard/blogs`}>{"<-Back"}</Link>
        <h1>Blog</h1>

        <BlogsCreateForm
          errors={errors}
          data={data}
          vendor={vendor}
          handleChange={this.handleChange}
          onModuleCheck={this.onModuleCheck}
          handleSubmit={this.handleSubmit}
          isRequesting={this.props.requesting}
          moduleList={moduleList}
          roleModule={roleModule}
          handleEditorChange={this.handleEditorChange}
          urlAction={urlAction}
          onDrop={this.onDrop}
          file={file}
          handleActiveChecked={this.handleActiveChecked}
          handleFeaturedChecked={this.handleFeaturedChecked}
          handleTags={this.handleTags}
          handleTagAddition={this.handleTagAddition}
          tagOptions={tagOptions}
          handleEmpty={this.handleEmpty}
          handlePublishDateChange={this.handlePublishDateChange}
          parseDate={this.parseDate}
          handleOptionSelect={this.handleOptionSelect}
          categories={categories}
          handleStatusChange={this.handleStatusChange}
          renderCategoryOption={this.renderCategoryOption}


        />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);

