import type { D1Database } from '@cloudflare/workers-types';

declare global {
	namespace App {
		interface Platform {
			env: {
				INQUIRIES_DB?: D1Database;
			};
		}
	}
}

export {};
