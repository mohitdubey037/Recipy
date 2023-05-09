import { DataTypes, Model } from "sequelize";
import { Optional } from "sequelize";

import sequelizeConnection from "../config";

interface OtpAttribute {
    email: string;
    otp: number;
    otpExpires?: number;
}

// export interface OtpInput
//   extends <OtpAttribute> {}
export interface OtpInput
  extends Optional<OtpAttribute, "otpExpires"> {}

export interface OtpOutput extends Required<OtpAttribute> {}

class Otp
  extends Model<OtpAttribute>
  implements OtpAttribute
{
  public email!: string;
  public otp!: number;
  public otpExpires!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Otp.init(
  {
    email: {
        type: DataTypes.STRING
    },
    otp: {
        type: DataTypes.INTEGER
    },
    otpExpires: {
        type: DataTypes.DATE,
        defaultValue: Date.now() + 43200
    }
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    timestamps: true,
  }
);

export default Otp;