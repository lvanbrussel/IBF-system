import { Entity, Column, Check, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_pcode', { schema: 'IBF-pipeline-output' })
export class EventPcodeEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public pcode: string;

  @Column({ type: 'timestamp', nullable: true })
  public start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Check(`"start_date" < "end_date"`)
  public end_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  public manual_closed_date: Date;

  @Column({ default: true })
  public active_trigger: boolean;

  @Column({ default: false })
  public closed: boolean;
}
