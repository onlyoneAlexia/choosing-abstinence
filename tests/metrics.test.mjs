import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normaliseSource,lagosDay,dateRange,requestedDays} from '../lib/metrics.ts';
test('explicit campaign sources override referrers without retaining arbitrary values',()=>{
 assert.equal(normaliseSource(' tIkToK ','https://instagram.com'),'TikTok');
 assert.equal(normaliseSource('someone@example.com',''),'Other');
 assert.equal(normaliseSource(null,''),'Direct');
});
test('recognises platform subdomains but not lookalike hostnames',()=>{
 assert.equal(normaliseSource(null,'https://l.instagram.com/?u=private'),'Instagram');
 assert.equal(normaliseSource(null,'https://tiktok.com.attacker.test'),'Other');
 assert.equal(normaliseSource(null,'https://not-tiktok.com'),'Other');
});
test('daily boundaries follow Lagos time and ranges cross months correctly',()=>{
 const now=new Date('2026-10-31T23:30:00Z');
 assert.equal(lagosDay(now),'2026-11-01');
 assert.deepEqual(dateRange(3,now),['2026-10-30','2026-10-31','2026-11-01']);
 assert.equal(requestedDays('90'),90);
 assert.equal(requestedDays('90000'),30);
 assert.equal(requestedDays(null),30);
});
