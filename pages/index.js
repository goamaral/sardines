
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
      </section>
    </Page>
  )
}

export default Index