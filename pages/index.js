
import fetch from 'isomorphic-unfetch'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'

import '../styles/pages/index.scss'
import Page from '../components/page'

const Index = props => {
  return (
    <Page>
      <section className="hero is-fullheight">
        <div className="hero-head">
          <a href="#">Entrar</a>
          <a href="#">Registar</a>
        </div>
        <div className="hero-body">
          <div className="box">
            <h1 className="title is-1">Almanaque da Sardinha</h1>
            <div className="control has-icons-right">
              <input className="input" type="text" placeholder="Que estás para ai a dizer?"></input>
              <span className="icon is-small is-right">
                <Icon path={mdiMagnify} size="1.5rem"/>
              </span>
            </div>
          </div>
        </div>
        <div className="hero-foot"></div>
      </section>

      <section className="section">
        { render_recent_submissions() }
      </section>
    </Page>
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