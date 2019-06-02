// Reusable form to be used with StreamCreate and StreamEdit
import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component {
    renderError({error,touched}) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        // String interpolation; if two parameters are true, proceed with ternary expression
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off'/>
                {/* <div>{meta.error}</div> */}
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.onSubmit(formValues);
    }

    // Normally onSubmit would refer to {this.onSubmit} but Redux form handles it differently
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                <Field name='title' component={this.renderInput} label='Enter Title'/>
                <Field name='description' component={this.renderInput} label='Enter Description'/>
                <button className='ui button primary'>Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        // Only runs if user did not input a title
        errors.title = 'You must enter a title.';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description.';
    }
    return errors;
};

// Combine both connect reduxform function with redux connect function
// StreamForm is wrapped in Redux Form helper
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);