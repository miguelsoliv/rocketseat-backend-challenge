export class ChallengeAnsweredEvent {
  submissionId: string;
  repositoryUrl: string;

  constructor(data: ChallengeAnsweredEvent) {
    Object.assign(this, data);
  }
}
