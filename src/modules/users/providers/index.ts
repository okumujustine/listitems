import { container } from 'tsyringe';

import IJwtProvider from './jwt/IJwtProvider';
import JwtProvider from './jwt/implementation/JwtProvider';

container.registerSingleton<IJwtProvider>('JwtProvider', JwtProvider);