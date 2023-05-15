class App extends React.Component {
    state = {
        theme: 'light'
    }

    toggleTheme = () => {
        this.setState({ theme: this.state.theme === 'light' ? 'dark' : 'light' });
    }

    render() {
        return (
            <div className={`container ${this.state.theme}-theme`}>
                <button onClick={this.toggleTheme}>Toggle Theme</button>
                <h1>Welcome to my portfolio</h1>
                <div className="about">
                    <h2>About me</h2>
                    <p>Hello! I'm a web developer.</p>
                </div>
                <div className="projects">
                    <h2>Projects</h2>
                    <p>Here are some of my projects:</p>
                    {/* You can list your projects here */}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
