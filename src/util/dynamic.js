import React from "react";

/**
 * 路由分割方法
 */
export function dynamic(loadComponent) {
    return class extends React.Component{
        state = {Component:null}
        componentDidMount() {
            loadComponent().then(result => {
                this.setState({Component: result.default})
            })
        }
        render() {
            const {Component} = this.state
            return Component && <Component></Component>
        }
    }
}