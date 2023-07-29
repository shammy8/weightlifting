import { ShortenSetsPipe } from './shorten-sets.pipe';
import { Set } from '../models/models';

fdescribe('ShortenSetsPipe', () => {
  it('should return', () => {
    const pipe = new ShortenSetsPipe();
    expect(pipe.transform([], 'reps')).toEqual(null);
  });

  it('should return return the shorten sets in sets and reps format', () => {
    const pipe = new ShortenSetsPipe();
    const sets: Set[] = [
      { reps: 2, weight: null, time: null, distance: null },
      { reps: 2, weight: null, time: null, distance: null },
      { reps: 2, weight: null, time: null, distance: null },
    ];
    expect(pipe.transform(sets, 'reps')).toEqual('3 x 2');
  });

  it('should return the reps as a range', () => {
    const pipe = new ShortenSetsPipe();
    const sets: Set[] = [
      { reps: 2, weight: null, time: null, distance: null },
      { reps: 2, weight: null, time: null, distance: null },
      { reps: 5, weight: null, time: null, distance: null },
      { reps: 3, weight: null, time: null, distance: null },
    ];
    expect(pipe.transform(sets, 'reps')).toEqual('4 x 2-5');
  });

  it('should return empty string if all the reps are null', () => {
    const pipe = new ShortenSetsPipe();
    const sets: Set[] = [
      { reps: null, weight: null, time: null, distance: null },
      { reps: null, weight: null, time: null, distance: null },
      { reps: null, weight: null, time: null, distance: null },
      { reps: null, weight: null, time: null, distance: null },
    ];
    expect(pipe.transform(sets, 'reps')).toEqual('');
  });

  // TODO: is this what w want to return if some reps are null?
  it('should return just the sets if all the reps are null', () => {
    const pipe = new ShortenSetsPipe();
    const sets: Set[] = [
      { reps: 1, weight: null, time: null, distance: null },
      { reps: null, weight: null, time: null, distance: null },
      { reps: null, weight: null, time: null, distance: null },
      { reps: null, weight: null, time: null, distance: null },
    ];
    expect(pipe.transform(sets, 'reps')).toEqual('4 x 1');
  });
});
