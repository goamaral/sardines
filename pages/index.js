import SearchBox from '../components/search_box'
import styles from './index.module.css'

const Index = props => {
  return (
    <>
      <section className={`hero is-fullheight ${styles.hero}`}>
        <div className={`hero-head ${styles.hero__head}`}>
          <a className='mx-4 my-5 has-text-grey-dark is-uppercase' href='#'>Entrar</a>
          <a className='mx-4 my-5 has-text-grey-dark is-uppercase' href='#'>Registar</a>
        </div>

        <div className={`hero-body ${styles.hero__body}`}>
          <div className={`box ${styles.hero__body__box}`}>
            <h1 className='title is-1 is-uppercase'>Almanaque da Sardinha</h1>
            <SearchBox />
          </div>
        </div>
        <div className='hero-foot' />
      </section>

      <section className='section'>
        TOP SARDINHAS
      </section>
    </>
  )
}

export default Index
