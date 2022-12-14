import React, { createContext } from "react"
import { app } from "config/firebase"
const AuthContext = createContext([])

class AuthProvider extends React.Component {
  // const [authenticated, setAuthenticated] = useState<{user : string | null, isAuthenticated : boolean}>({user : null, isAuthenticated : false});

  // const authlistener = () => {
  //     auth.onAuthStateChanged((user) => {
  //         if(user){
  //             setAuthenticated({user : user.email, isAuthenticated :   true});
  //         }else{
  //             setAuthenticated({user : null, isAuthenticated : false});
  //         }
  //     });
  // }

  // useEffect(() => {
  //     authlistener();
  // }, [])

  constructor(props) {
    super(props)
    this.state = {
      authenticted: {},
    }
  }

  componentDidMount() {
    this.isAuthenticated()
  }

  isAuthenticated = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticted: user })
      } else {
        this.setState({ authenticted: null })
      }
    })
  }

  render() {
    const { authenticted } = this.state

    return (
      <div>
        <AuthContext.Provider value={authenticted}>
          {this.props.children}
        </AuthContext.Provider>
      </div>
    )
  }
}

export { AuthProvider, AuthContext }
