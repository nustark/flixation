import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import React from 'react';
import StreamForm from './StreamForm';

// URL-based selection implementation, done by adding :id to StreamEdit, StreamDelete, StreamShow

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        // So component fetches its own data
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
            // If we don't have a stream, return loading
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm initialValues={this.props.stream} onSubmit={this.onSubmit}></StreamForm>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // ownProps is the same props object being passed to the component
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);