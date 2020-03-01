
import { Fragment } from 'react'
import fetch from 'isomorphic-unfetch'
import sardine_light_blue from '../images/sardine_light_blue.png'

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center"
  },
  navLink: {
    fontFamily: "Roboto",
    fontSize: "20px",
    textAlign: "center",
    letterSpacing: "2px",
    paddingTop: "8px",
    paddingLeft: "10px"
  },
  grid: {
    backgroundImage: `url(${sardine_light_blue})`,
    backgroundSize: "cover",
    height: "137vh",
    width: "100%",
    marginBottom: "40px"
  },
  title: {
    backgroundColor:"#F2EFE8",
    color: "#3A3C43",
    border: "5px solid #3A3C43",
    borderBottom: "none",
    fontSize: "50px",
    width: "790px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600
  },
  search: {
    width: "800px"
  },
  form_search: {
    display: "flex",
    flexSirection: "row"
  }
}


const Index = props => {
  return (
    <Fragment>
      <div style={styles.nav}>
        <a style={styles.navLink} href="<%= routes['website_sign_in'] %>">ENTRAR</a>
        <a style={styles.navLink} href="<%= routes['website_sign_up'] %>">REGISTAR </a>
      </div>

      <div style={styles.grid}>
        <div style={styles.title}>
          <p>ALMANAQUE DA SARDINHA</p>
        </div>

        <div style={styles.search}>
          <form style={styles.form_search} action="<%= routes['website_search'] %>">
            <input type="text" name="search" placeholder="COMO É QUE É?" className="placeholder"/>
            <div className="search_input" onClick="this.parent.submit()">
              <i className="fas fa-search"></i>
            </div>
          </form>
        </div>
      </div>

      <div className="grid-container">
        <div className="header">RECENTES</div>
        { render_recent_submissions() }
      </div>
    </Fragment>
  )

  function render_recent_submissions() {
    return props.recent_submissions.map((recent_submission, i) => 
      <a className={`card card_${i}`} key={recent_submission.slug} href={`submissions/${recent_submission.slug}`}>
        { recent_submission.expression }
      </a>
    )
  }
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/submissions/recent')
  const recent_submissions = await res.json()

  return { recent_submissions }
}

export default Index