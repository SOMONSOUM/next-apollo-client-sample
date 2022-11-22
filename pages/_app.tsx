import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { TokenContainer } from '../src/components/Authentication/TokenContext'
import { AuthProvider } from '../src/hook/auth'
import LoginVerification from '../src/components/Authentication/LoginVerification'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokenContainer>
      <AuthProvider>
        <LoginVerification>
          <Component {...pageProps} />
        </LoginVerification>
      </AuthProvider>
    </TokenContainer >
  )
}
