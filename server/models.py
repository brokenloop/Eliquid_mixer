from app_setup import db

class Recipe(db.Model):
    __tablename__ = 'recipes'
    __table_args__ = (db.UniqueConstraint('name', 'version', name='uix_1'),)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column("name", db.String)
    version = db.Column("version", db.Integer)
    batchvolume = db.Column("batchvolume", db.Integer)
    batchnic = db.Column("batchnic", db.Integer)
    batchratio = db.Column("batchratio", db.Integer)
    basenic = db.Column("basenic", db.Integer)
    baseratio = db.Column("baseratio", db.Integer)
    flavours = db.relationship("Flavour", cascade="all, delete-orphan")

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    

class Flavour(db.Model):
    __tablename__ = 'flavours'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column("name", db.String)
    percentage = db.Column("percentage", db.Integer)
    recipeid = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

        
# A generic user model that might be used by an app powered by flask-praetorian
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    roles = db.Column(db.String)
    is_active = db.Column(db.Boolean, default=True, server_default='true')

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active