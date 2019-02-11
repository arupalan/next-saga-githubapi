class DropdownItem extends React.Component {

    getDefaultProps() {
        return {
            className: 'item',
            focus: false,
            index: 0
        };
    }

    componentDidUpdate() {

        if (this.props.focus) { this.getDOMNode().focus(); }
    }

    _onKeyDown (event) {
        event.preventDefault();
        if (event.keyCode === 13 || event.type === 'touchstart') {
            return this.props.onItemSelect(this.props.index);
        }
        this.props.onKeyDown(event);
    }
    render() {
        return (
            <li className={this.props.className}
              tabIndex='-1'
              onKeyDown={this._onKeyDown}
              onTouchStart={this._onKeyDown}>{this.props.children}</li>
        );
    }
}

export default DropdownItem;
